import { Component, DestroyRef, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	ControlComponent,
	DialogRef,
	FormErrorComponent,
	ServerErrorsComponent,
	SnackbarRef,
	ToastRef,
	WindowComponent,
} from '@ui';
import { REGISTER_FORM } from '@di';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@showcase/services';
import { BehaviorSubject } from 'rxjs';
import { ActivationReq, BackendErrors } from '@types';
import { Portal } from '@cdk';
import { PersistenceService } from '@shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SbValidators } from '@shared/validators';
import { ButtonComponent } from '@showcase/components/ui';

@Component({
	selector: 'sb-register',
	standalone: true,
	imports: [
		CommonModule,
		ControlComponent,
		ReactiveFormsModule,
		FormErrorComponent,
		RouterLink,
		ServerErrorsComponent,
		ControlComponent,
		NgxMaskDirective,
		ButtonComponent,
	],
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	providers: [Portal, ToastRef, DialogRef, provideNgxMask(), SnackbarRef],
})
export class RegisterComponent {
	protected form = inject(REGISTER_FORM);
	protected verifyForm = new FormGroup(
		{
			code: new FormControl('', [Validators.required]),
		},
		{
			validators: [SbValidators.codeValidator],
		},
	);
	private _authService = inject(AuthService);
	private _dialogRef = inject(DialogRef);
	protected errors$ = new BehaviorSubject<BackendErrors>({} as BackendErrors);
	private _destroyRef = inject(DestroyRef);
	private _toastRef = inject(ToastRef);
	private _snackbarRef = inject(SnackbarRef);

	private _persistenceService = inject(PersistenceService);

	protected get emailField() {
		return this.form.get('email');
	}

	protected get username() {
		return this.form.get('username');
	}
	protected get password() {
		return this.form.controls['password'];
	}

	protected get checkPassword() {
		return this.form.controls['checkPassword'];
	}

	protected get checkPasswordValue() {
		return this.checkPassword?.value as string;
	}

	protected get activation() {
		return this.verifyForm.get('code');
	}

	protected get isCorrectCode() {
		const code = this._persistenceService.getItem('code');
		return (this.activation?.value as string) === code;
	}

	protected openWindow(template: TemplateRef<unknown>) {
		this._dialogRef
			.open(
				WindowComponent,
				{ class: 'user-editor', template: template, isBackdrop: true },
				{ windowName: 'Code verification' },
			)
			.subscribe();
	}

	protected submitCode(template: TemplateRef<unknown>) {
		const id = this._persistenceService.getItem('id') as string;
		const code = this.verifyForm?.value;
		const data: ActivationReq = {
			code: this.activation?.value as string,
		};
		console.log(id);
		console.log(code);
		this._authService.activateUser(id, data).subscribe({
			next: (v) => {
				this._toastRef.createToast({ type: 'success', status: 200, text: 'Successful' });
				this._snackbarRef.showSnackbar({ template, message: 'You want to redirect to account?' });
			},
			error: (err: BackendErrors) =>
				this._toastRef.createToast({ type: 'error', text: 'Registration Error', status: err.statusCode }),
		});
	}

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault();
		event.stopPropagation();
		const data = {
			registerDate: new Date().toISOString(),
			timeAfterRegister: new Date(Date.now() - Date.now()).toISOString(),
			...this.form.value,
		};

		this._authService
			.registerUser(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: (v) => {
					this._persistenceService.setItem('id', String(v.id));
					this._persistenceService.setItem('code', String(v.activationCode));
					this._toastRef.createToast({ type: 'success', status: 200, text: 'Register Successful' });
				},
				error: (err: BackendErrors) => {
					this._toastRef.createToast({ type: 'error', text: 'Error', status: err.statusCode });
					this.errors$.next(err);
				},
			});
	}
}
