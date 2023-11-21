import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent, FormErrorComponent, ServerErrorsComponent, ToastRef } from '@ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Router, RouterLink } from '@angular/router';
import { LOGIN_FORM } from '@di';
import { UserLogin } from '@types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loginStartAction } from '@store/actions/auth/login.action';
import { loginSFailSelector } from '@store/selectors';
import { Portal } from '@cdk';

@Component({
	selector: 'sb-login',
	standalone: true,
	imports: [
		CommonModule,
		ControlComponent,
		FormErrorComponent,
		FormsModule,
		NgxMaskDirective,
		ReactiveFormsModule,
		RouterLink,
		ServerErrorsComponent,
	],
	providers: [Portal, ToastRef],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
	protected form = inject(LOGIN_FORM);
	private store = inject(Store);
	private toastRef = inject(ToastRef);
	private _destroyRef = inject(DestroyRef);
	private _router = inject(Router);
	private _timer!: number;
	protected errors$ = this.store.select(loginSFailSelector);

	protected get username() {
		return this.form.get('username');
	}

	protected get password() {
		return this.form.get('password');
	}

	protected login() {
		const data: UserLogin = {
			username: this.username?.value,
			password: this.password?.value,
		};
		this.store.dispatch(loginStartAction({ data }));

		this._timer = setTimeout(() => this._router.navigateByUrl('/'), 400);
		if (this.errors$) {
			this.errors$
				.pipe(takeUntilDestroyed(this._destroyRef))
				.subscribe((err) =>
					this.toastRef.createToast({ type: 'error', text: 'Error while logging in', status: err?.statusCode }),
				);
		}
	}

	ngOnDestroy() {
		clearTimeout(this._timer);
	}
}
