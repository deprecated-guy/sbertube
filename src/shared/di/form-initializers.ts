import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { InjectionToken } from '@angular/core';
import { SbValidators } from '../validators';

const formFactory = (controls: string[], validators: ValidatorFn[], isRegForm?: boolean) => {
	const formGroup = new FormGroup(
		{},
		isRegForm
			? {
					validators: [SbValidators.passwordsValidator, SbValidators.validateEmail],
			  }
			: {},
	);

	controls.forEach((control, index) => {
		const controlValidators = [
			Validators.required,
			Validators.minLength(3),

			...(validators[index] ? [validators[index]] : []),
		];

		formGroup.addControl(control, new FormControl('', controlValidators));
	});

	return formGroup;
};

export const REGISTER_FORM = new InjectionToken<FormGroup>('REGISTER', {
	providedIn: 'root',
	factory: () =>
		formFactory(
			['email', 'username', 'password', 'checkPassword'],
			[Validators.email, Validators.pattern(/[A-Za-z0-9]/gi)],
			true,
		),
});

export const LOGIN_FORM = new InjectionToken<FormGroup>('LOGIN', {
	providedIn: 'root',
	factory: () => formFactory(['username', 'password'], [Validators.pattern(/[A-Za-z0-9]/gi)]),
});

export const VIDEO_UPLOAD_FORM = new InjectionToken<FormGroup>('UPLOAD', {
	providedIn: 'root',
	factory: () => formFactory(['title', 'body', 'shortBody'], [], false),
});

export const COMMENT_FORM = new InjectionToken<FormGroup>('COMMENT', {
	providedIn: 'root',
	factory: () => formFactory(['body'], [Validators.maxLength(255)], false),
});

export const SEARCH_FORM = new InjectionToken<FormGroup>('', {
	providedIn: 'root',
	factory: () => formFactory(['search'], [], false),
});
export const USER_EDIT_FORM = new InjectionToken<FormGroup>('', {
	providedIn: 'root',
	factory: () =>
		formFactory(
			['username', 'password', 'bannerBackground', 'avatarBackground'],
			[Validators.required, Validators.pattern(/[A-Za-z0-9]/g)],
			false,
		),
});
