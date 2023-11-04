import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, UserPageSwitcheComponent } from '@showcase/components/ui';
import { ConvertTimePipe } from '@showcase/components/user';
import { DialogRef, FormErrorComponent, ToastRef } from '@ui';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { UserService } from '@showcase/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IS_MOBILE } from '@di';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BackendErrors, User, UserEdit } from '@types';
import { map } from 'rxjs';
import { PersistenceService } from '@shared/services';
import { Portal } from '@cdk';

@Component({
	selector: 'sb-page',
	standalone: true,
	imports: [
		CommonModule,
		ButtonComponent,
		ConvertTimePipe,
		FormErrorComponent,
		ReactiveFormsModule,
		UserAvatarComponent,
		UserPageSwitcheComponent,
		UserBannerComponent,
	],
	providers: [Portal, ToastRef, DialogRef],
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
	private _userService = inject(UserService);
	private _formBuilder = inject(FormBuilder);
	private _toastRef = inject(ToastRef);
	private _destroyRef = inject(DestroyRef);
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _title$ = this._route.paramMap.pipe(map((param) => param.get('username') as string));
	private _title = toSignal(this._title$, { initialValue: '' });
	private _titleService = inject(Title);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	private _persistenceService = inject(PersistenceService);
	protected token = this._persistenceService.getItem('token');
	protected currentUser$ = this._userService.getUserByUsername(this._title());
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
		const data: UserEdit = {
			userAbout: fieldData,
			avatarBackGround: this.currentUser().avatarBackground,
			bannerBackground: this.currentUser().bannerBackground,
			username: this.currentUser().username,
			email: this.currentUser().email,
			password: this.currentUser().password,
		};

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

	protected get homePath() {
		return `/author/${this.currentUser().username}`;
	}

	protected get libraryPath() {
		return `/author/${this.currentUser().username}/library`;
	}

	protected unLogin() {
		localStorage.clear();
		this._router.parseUrl('/');
	}
	ngOnInit() {
		this._titleService.setTitle(`${this.currentUser().username}'s account`);
	}
}
