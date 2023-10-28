import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	inject,
	NgZone,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BackendErrors, User, UserEdit } from '@types';
import { IS_MOBILE, USER_EDIT_FORM } from '@di';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ControlComponent, DialogRef, FormErrorComponent, IconComponent, ToastRef } from '@ui';
import { ReactiveFormsModule } from '@angular/forms';
import { Portal } from '@cdk';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent, RippleDirective } from '@showcase/components/ui';
import { fromEvent } from 'rxjs';
import { PersistenceService } from '@shared/services';

@Component({
	selector: 'sb-user-editor',
	standalone: true,
	imports: [
		CommonModule,
		ControlComponent,
		IconComponent,
		ReactiveFormsModule,
		FormErrorComponent,
		RippleDirective,
		ButtonComponent,
		RouterLink,
	],
	templateUrl: './user-editor.component.html',
	styleUrls: ['./user-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef, DialogRef],
	animations: [
		trigger('openDown', [
			state('open', style({ width: '100%', height: '*' })),
			state('closed', style({ width: '100%', height: 0 })),
			transition('open<=> closed', animate(300)),
		]),
	],
})
export class UserEditorComponent {
	@ViewChild('button', { read: ElementRef<HTMLButtonElement> })
	private _buttonElement!: ElementRef<HTMLButtonElement>;

	private _ngZone = inject(NgZone);
	private _renderer = inject(Renderer2);
	private _userService = inject(UserService);
	private _persistenceService = inject(PersistenceService);
	protected currentUser$ = this._userService.getCurrentUser();
	private _toastRef = inject(ToastRef);
	private _destroyRef = inject(DestroyRef);
	private _router = inject(Router);
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = inject(USER_EDIT_FORM);
	protected editorMobileAnimationState = 'closed';
	protected IS_MOBILE$ = inject(IS_MOBILE);

	protected get allWatchedTime() {
		return this.currentUser().watchedVideos.reduce((index, video) => (index += video.video.watchedTime), 0);
	}

	protected get email() {
		return this.form.get('email');
	}

	protected get username() {
		return this.form.get('username');
	}

	protected get password() {
		return this.form.get('password');
	}

	protected changeEditorMobileAnimationState() {
		this.editorMobileAnimationState = this.editorMobileAnimationState == 'closed' ? 'open' : 'closed';
	}

	protected submit() {
		const data: UserEdit = {
			...this.form?.value,
		};
		this._userService
			.editUser(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: () => {
					this._toastRef.createToast({ type: 'success', status: 200, text: 'Account Successfully edited' });
				},
				error: (err: BackendErrors) =>
					this._toastRef.createToast({ type: 'error', text: 'Error during processing data', status: err.statusCode }),
			});
	}

	protected showConfirmation(rippleColor: string) {
		fromEvent<MouseEvent>(this._buttonElement.nativeElement, 'mousedown')
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (e) => {
					const ripple = this._renderer.createElement('div');
					this._renderer.addClass(ripple, 'ripple');
					ripple.style.position = 'absolute';
					ripple.style.left =
						e.clientX - this._buttonElement.nativeElement.offsetLeft / 0.7 - ripple.offsetWidth / 2 + 'px';
					ripple.style.background = rippleColor;
					ripple.style.top =
						e.clientY - this._buttonElement.nativeElement.offsetTop / 2 - ripple.offsetHeight / 0.7 + 'px';
					this._renderer.appendChild(this._buttonElement.nativeElement, ripple);

					this._ngZone.runOutsideAngular(() =>
						setTimeout(() => this._renderer.removeChild(this._buttonElement.nativeElement, ripple), 1000),
					);
				},
			});
		this._ngZone.runOutsideAngular(() =>
			setTimeout(async () => {
				this._userService
					.deleteUser()
					.pipe(takeUntilDestroyed(this._destroyRef))
					.subscribe({
						next: () => {
							this._toastRef.createToast({ type: 'success', status: 200, text: 'All ok' });
						},
					});

				await this._router.navigateByUrl('/');
				this._persistenceService.clean();
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}, 1000),
		);
	}
}
