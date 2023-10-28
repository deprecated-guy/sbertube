import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	NgZone,
	Renderer2,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, UserPageSwitcheComponent } from '@showcase/components/ui';
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
	PlayerComponent,
	ToastRef,
	WindowComponent,
} from '@ui';
import { Portal } from '@cdk';
import { fromEvent } from 'rxjs';
import { VIDEO_UPLOAD_FORM } from '@di';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'sb-library',
	standalone: true,
	imports: [
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
	],
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef, DialogRef],
})
export class LibraryComponent {
	@ViewChild('button', { read: ElementRef<HTMLButtonElement> })
	private _button!: ElementRef<HTMLButtonElement>;
	private _renderer = inject(Renderer2);
	private _ngZone = inject(NgZone);
	private _userService = inject(UserService);
	private _videoLoader = inject(VideoLoader);
	private _dialogRef = inject(DialogRef);
	private _toastRef = inject(ToastRef);
	private _file = <File>{};
	private _destroyRef = inject(DestroyRef);
	protected currentUser$ = this._userService.getCurrentUser();
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = inject(VIDEO_UPLOAD_FORM);

	protected openWindow(templateRef: TemplateRef<unknown>) {
		this._dialogRef
			.open(WindowComponent, { class: 'lg', template: templateRef, isBackdrop: true }, { windowName: 'Upload video' })
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

	protected uploadVideo(rippleColor: string) {
		const data = new FormData();
		data.set('file', this._file);

		fromEvent<MouseEvent>(this._button.nativeElement, 'mousedown')
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (e) => {
					const ripple = this._renderer.createElement('div');
					this._renderer.addClass(ripple, 'ripple');
					ripple.style.position = 'absolute';
					ripple.style.left = e.offsetX + 'px';
					ripple.style.background = rippleColor;
					ripple.style.top = e.offsetY + 'px';
					this._renderer.appendChild(this._button.nativeElement, ripple);

					this._ngZone.runOutsideAngular(() =>
						setTimeout(() => this._renderer.removeChild(this._button.nativeElement, ripple), 400),
					);
				},
			});
		this._ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				this._videoLoader
					.sendVideo(data)
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: (user) => {
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
		this._file = event;
	}
}
