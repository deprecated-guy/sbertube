import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, NgZone } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BackendErrors, User, UserEdit } from '@types';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { ButtonComponent, showButtonsAnimation, UserPageSwitcheComponent } from '@showcase/components/ui';
import {
	ControlComponent,
	ControlFileComponent,
	FormErrorComponent,
	HintDirective,
	IconComponent,
	ToastRef,
} from '@ui';
import { IS_LANDSCAPE, IS_MOBILE } from '@di';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConvertTimePipe } from '@showcase/components/user/pipes/convert-time.pipe';
import { Portal } from '@cdk';

@Component({
	selector: 'sb-user-page',
	standalone: true,
	imports: [
		CommonModule,
		UserBannerComponent,
		UserAvatarComponent,
		UserPageSwitcheComponent,
		IconComponent,
		ControlComponent,
		ReactiveFormsModule,
		AsyncPipe,
		FormErrorComponent,
		ConvertTimePipe,
		ButtonComponent,
		HintDirective,
		ControlFileComponent,
	],
	templateUrl: './user-page.component.html',
	styleUrls: ['./user-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Portal, ToastRef],
	animations: [showButtonsAnimation],
})
export class UserPageComponent {
	private _userService = inject(UserService);
	private _formBuilder = inject(FormBuilder);
	private _destroyRef = inject(DestroyRef);
	private _ngZone = inject(NgZone);
	private _toastRef = inject(ToastRef);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected IS_LANDSCAPE$ = inject(IS_LANDSCAPE);
	protected currentUser$ = this._userService.getCurrentUser();
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = this._formBuilder.group({
		aboutUser: ['', [Validators.required]],
	});

	protected get userAbout() {
		return this.form.get('aboutUser');
	}

	protected close(area: HTMLTextAreaElement) {
		area.contentEditable = 'false';

		area.classList.remove('edit-field');
	}

	protected editBio(area: HTMLTextAreaElement) {
		area.contentEditable = area.contentEditable === 'true' ? 'false' : 'true';
		area.classList.toggle('edit-field');
	}

	protected saveNewBio(area: HTMLTextAreaElement) {
		const fieldData = this.userAbout?.value as string;
		console.log(fieldData);
		const data: UserEdit = {
			userAbout: fieldData,
			avatarBackGround: this.currentUser().avatarBackground,
			bannerBackground: this.currentUser().bannerBackground,
			username: this.currentUser().username,
			email: this.currentUser().email,
			password: this.currentUser().password,
		};
		console.log(data);

		this._userService
			.editUser(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (user) => {
					computed(() => (this.currentUser().userAbout = user.userAbout));
					this._toastRef.createToast({ type: 'success', text: 'Successfully edited', status: 200 });
					area.contentEditable = 'false';
					area.classList.remove('edit-field');
				},
				error: (err: BackendErrors) =>
					this._toastRef.createToast({ type: 'error', text: 'Successfully edited', status: err.statusCode }),
			});
	}
}
