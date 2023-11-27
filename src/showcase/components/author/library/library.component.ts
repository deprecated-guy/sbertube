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
import { UserService, VideoLoader } from '@showcase/services';
import {
	ControlComponent,
	ControlFileComponent,
	createRipple,
	DialogRef,
	FormErrorComponent,
	PlayerComponent,
	ToastRef,
	WindowComponent,
} from '@ui';
import { Title } from '@angular/platform-browser';
import { IS_MOBILE, VIDEO_UPLOAD_FORM } from '@di';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BackendErrors, User } from '@types';
import { types } from '@shared/types/vide-file-types';
import { Portal } from '@cdk';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, UserPageSwitcheComponent, VideoPreviewComponent } from '@showcase/components/ui';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { PersistenceService } from '@shared/services';
import { UserBannerComponent } from '@shared/ui/components/user';
import { VideoActionComponent } from '@shared/ui/components/video-action/video-action.component';
import { RouteComputationPipe } from '@shared/pipes';
import { routingConst } from '@showcase/routing';

@Component({
	selector: 'sb-library',
	standalone: true,
	imports: [
		CommonModule,
		ControlComponent,
		ControlFileComponent,
		FormErrorComponent,
		PlayerComponent,
		ReactiveFormsModule,
		UserPageSwitcheComponent,
		UserBannerComponent,
		RouterLink,
		RouterLinkActive,
		VideoPreviewComponent,
		ButtonComponent,
		VideoActionComponent,
		RouteComputationPipe,
	],
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	providers: [Portal, DialogRef, ToastRef],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	private _route = inject(ActivatedRoute);
	private _username$ = this._route.paramMap.pipe(map((param) => param.get('username') as string));
	private _pageTitle = toSignal(this._username$, { initialValue: '' });
	private _persistenceService = inject(PersistenceService);
	protected token = this._persistenceService.getItem('token');
	protected file!: File;
	protected sourceLink!: string;
	protected currentUser$ = this._userService.getUserByUsername(this._pageTitle());
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
		return `/author/${this.currentUser().username}`;
	}

	protected get libraryPath() {
		return `/author/${this.currentUser().username}/library`;
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
		this._titleService.setTitle(`${this._pageTitle()}'s Library`);
	}

	protected readonly routingConst = routingConst;
	protected readonly routingConst = routingConst;
}
