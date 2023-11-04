import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	NgZone,
	OnInit,
	Renderer2,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	ButtonComponent,
	RippleDirective,
	UserPageSwitcheComponent,
	VideoPreviewComponent,
} from '@showcase/components/ui';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { UserService, VideoLoader } from '@showcase/services';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BackendErrors, User } from '@types';

import {
	ControlComponent,
	ControlFileComponent,
	DialogRef,
	FormErrorComponent,
	HintDirective,
	IconComponent,
	PlayerComponent,
	ToastRef,
	WindowComponent,
} from '@ui';
import { Portal } from '@cdk';
import { IS_MOBILE, VIDEO_UPLOAD_FORM } from '@di';
import { ReactiveFormsModule } from '@angular/forms';
import { createRipple } from '@shared/ui/animations/ripple';
import { types } from '@shared/types/vide-file-types';
import { RouterModule } from '@angular/router';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'sb-library',
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		UserBannerComponent,
		UserAvatarComponent,
		UserPageSwitcheComponent,
		ButtonComponent,
		PlayerComponent,
		HintDirective,
		ControlFileComponent,
		ReactiveFormsModule,
		ControlComponent,
		FormErrorComponent,
		VideoPreviewComponent,
		IconComponent,
		RippleDirective,
		VideoActionComponent,
	],
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef, DialogRef],
})
export class LibraryComponent implements OnInit {
	@ViewChild('button', { read: ElementRef<HTMLButtonElement> })
	private _button!: ElementRef<HTMLButtonElement>;
	private _renderer = inject(Renderer2);
	private _ngZone = inject(NgZone);
	private _userService = inject(UserService);
	private _videoLoader = inject(VideoLoader);
	private _dialogRef = inject(DialogRef);
	private _titleService = inject(Title);
	private _cdr = inject(ChangeDetectorRef);
	private _destroyRef = inject(DestroyRef);
	private _toastRef = inject(ToastRef);
	protected file!: File;
	protected sourceLink!: string;
	protected currentUser$ = this._userService.getCurrentUser();
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = inject(VIDEO_UPLOAD_FORM);

	protected openWindow(templateRef: TemplateRef<unknown>) {
		this._dialogRef
			.open(WindowComponent, { class: 'lg', template: templateRef, isBackdrop: true }, { windowName: 'Upload video' })
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe();
	}

	protected openMobileWindow(templateRef: TemplateRef<unknown>) {
		this._dialogRef
			.open(
				WindowComponent,
				{ class: 'mobile', template: templateRef, isBackdrop: true },
				{ windowName: 'Upload video' },
			)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe();
	}

	protected get title() {
		return this.form.get('title');
	}

	protected get shortDescription() {
		return this.form.get('shortBody');
	}

	protected get description() {
		return this.form.get('body');
	}

	protected get homePath() {
		return `/user/${this.currentUser().username}`;
	}

	protected get libraryPath() {
		return `/user/${this.currentUser().username}/library`;
	}

	protected uploadVideo(rippleColor: string) {
		const data = new FormData();
		data.set('file', this.file);
		data.set('title', this.title?.value);
		data.set('shortBody', this.shortDescription?.value);
		data.set('body', this.description?.value);

		createRipple(this._renderer, this._destroyRef, rippleColor, this._button, this._ngZone);

		this._ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				this._videoLoader
					.sendVideo(data)
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: () => {
							this._toastRef.createToast({ type: 'success', text: 'Updated Successfully', status: 200 });
						},
						error: (err: BackendErrors) => {
							this._toastRef.createToast({ type: 'error', text: 'Error During Update', status: err.statusCode });
						},
					});
			}, 1000);
		});

		console.log(data);
	}

	protected getFile(event: File) {
		const reader = new FileReader();
		reader.readAsArrayBuffer(event);
		reader.onload = () => {
			this.sourceLink = URL.createObjectURL(event);
			this._cdr.detectChanges();
			console.log(this.sourceLink);
		};
		console.log(types[event.type]);
		if (!types[event.type]) {
			this._toastRef.createToast({ text: 'supported only videos', status: 500, type: 'error' });
			return;
		} else {
			this.file = event;
		}
	}

	ngOnInit() {
		this._titleService.setTitle(`Your Library`);
	}
}
