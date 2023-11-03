import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent, FormErrorComponent, ServerErrorsComponent } from '@ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Router, RouterLink } from '@angular/router';
import { LOGIN_FORM } from '@di';
import { AuthService } from '@showcase/services';
import { UserLogin } from '@types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
	protected form = inject(LOGIN_FORM);
	private _authService = inject(AuthService);
	private _destroyRef = inject(DestroyRef);
	private _router = inject(Router);
	private _timer: any;

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

		this._authService.logIn(data).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
		this._timer = setTimeout(() => this._router.navigateByUrl('/'), 400);
	}

	ngOnDestroy() {
		clearTimeout(this._timer);
	}
}
