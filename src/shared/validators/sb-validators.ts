import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SbValidators {
	static codeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
		const code = localStorage.getItem('code');
		return control.value !== code ? { activation: 'Invalid activation code' } : null;
	};

	static passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
		return control.get('password')?.value === control.get('checkPassword')?.value ? null : { passwordsNotMatch: true };
	};

	static validateEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
		const emailControl = control.get('email');
		return /^[\w-\]+@([\w-]+\)+[\w-]{2,4}$/g.test(emailControl?.value) ? null : { inCorrect: true };
	};
}
