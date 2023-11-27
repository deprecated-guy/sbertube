import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { User, UserEdit } from '@types';
import { UserAvatarComponent, UserBannerComponent } from '@shared/ui/components/user';
import { ButtonComponent, showButtonsAnimation, UserPageSwitcheComponent } from '@showcase/components/ui';
import {
	ControlComponent,
	ControlFileComponent,
	DialogRef,
	FormErrorComponent,
	HintDirective,
	IconComponent,
	ToastRef,
} from '@ui';
import { IS_MOBILE } from '@di';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConvertTimePipe } from '@showcase/components/user/pipes/convert-time.pipe';
import { Portal } from '@cdk';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { editCurrentUserFailSelector, getCurrentUserSelector } from '@store/selectors';
import { editUserStart, getCurrentUserStart } from '@store/actions';
import { routingConst } from '@showcase/routing';

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
	providers: [Portal, ToastRef, DialogRef],
	animations: [showButtonsAnimation],
})
export class UserPageComponent implements OnInit {
	private store = inject(Store);
	private _formBuilder = inject(FormBuilder);
	private _destroyRef = inject(DestroyRef);
	private _toastRef = inject(ToastRef);
	private _router = inject(Router);
	private _titleService = inject(Title);
	protected IS_MOBILE$ = inject(IS_MOBILE);

	protected currentUser$ = this.store.select(getCurrentUserSelector);
	protected currentUser = toSignal(this.currentUser$, { initialValue: {} as User });
	private error$ = this.store.select(editCurrentUserFailSelector);
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
		const payload: UserEdit = {
			bio: this.currentUser().bio,
			avatarBackGround: this.currentUser().avatarBackground,
			bannerBackground: this.currentUser().bannerBackground,
			username: this.currentUser().username,
			email: this.currentUser().email,
			password: this.currentUser().password,
		};
		this.store.dispatch(editUserStart({ data: payload }));
		this._toastRef.createToast({ type: 'success', text: 'Successfully edited', status: 200 });
		area.contentEditable = 'false';
		area.classList.remove('edit-field');
		if (this.error$) {
			this.error$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((err) => {
				this._toastRef.createToast({ type: 'error', text: 'Successfully edited', status: err?.statusCode });
			});
		}
	}

	protected unLogin() {
		localStorage.clear();
		this._router.parseUrl('/');
	}

	ngOnInit() {
		this.store.dispatch(getCurrentUserStart());
		this._titleService.setTitle(`${this.currentUser().username}'s account`);
	}

	protected readonly routingConst = routingConst;
}
