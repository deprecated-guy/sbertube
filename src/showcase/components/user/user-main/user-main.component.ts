import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { Store } from '@ngrx/store';
import { User, UserEdit } from '@types';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogRef, ToastRef } from '@ui';
import { editUserFail, editUserStart, getCurrentUserFail, getCurrentUserStart } from '@store/actions';
import { Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IS_MOBILE } from '@di';
import { getCurrentUserSelector } from '@store/selectors';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UserBannerComponent } from '@shared/ui/components/user';
import { UserPageSwitcheComponent } from '@showcase/components/ui';
import { Portal } from '@cdk';
import { SkeletonLoaderComponent } from '@shared/ui/components';

@Component({
	selector: 'sb-user-main',
	standalone: true,
	providers: [Portal, ToastRef, DialogRef],
	templateUrl: './user-main.component.html',
	styleUrl: './user-main.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, RouterOutlet, UserBannerComponent, UserPageSwitcheComponent, SkeletonLoaderComponent],
})
export class UserMainComponent implements OnInit {
	private _userService = inject(UserService);
	private _store = inject(Store<User>);
	private _formBuilder = inject(FormBuilder);
	private _toastRef = inject(ToastRef);
	private _errors$ = this._store.select(getCurrentUserFail);
	private _ediUserError$ = this._store.select(editUserFail);
	private _router = inject(Router);
	private _titleService = inject(Title);
	protected IS_MOBILE$ = inject(IS_MOBILE);
	private destroyRef = inject(DestroyRef);
	protected currentUser$ = this._store.select(getCurrentUserSelector);
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	protected form = this._formBuilder.group({
		aboutUser: ['', [Validators.required]],
	});

	protected get homePath() {
		return `/user/account`;
	}

	protected get libraryPath() {
		return `/user/library`;
	}

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
			bio: fieldData,
			avatarBackGround: this.currentUser()?.avatarBackground as string,
			bannerBackground: this.currentUser()?.bannerBackground as string,
			username: this.currentUser()?.username as string,
			email: this.currentUser()?.email as string,
			password: this.currentUser()?.password as string,
		};

		this._store.dispatch(editUserStart({ data }));
		this._toastRef.createToast({ type: 'success', text: 'Successfully edited', status: 200 });
		if (this._ediUserError$) {
			this._ediUserError$.subscribe((err) => {
				this._toastRef.createToast({ type: 'error', text: 'Successfully edited', status: err.error?.statusCode });
			});
		}
		this.close(area);
	}

	ngOnInit() {
		this._store.dispatch(getCurrentUserStart());
		this.currentUser$ = this._store.select(getCurrentUserSelector);
		this.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
			this._titleService.setTitle(`${user?.username}'s account`);
			this.form.controls.aboutUser.setValue(user?.bio);
		});
	}
}
