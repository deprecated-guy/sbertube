import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@showcase/services';
import { loginFailAction, loginStartAction, loginSuccessAction } from '@store/actions/auth/login.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackendErrors } from '@types';
import {
	registerFailAction,
	registerStartAction,
	registerSuccessAction,
	verifyFailAction,
	verifyStartAction,
	verifySuccessAction,
} from '@store/actions';
import { PersistenceService } from '@shared/services';

@Injectable()
export class AuthEffects {
	private readonly authService = inject(AuthService);
	private readonly actions$ = inject(Actions);
	private persistenceService = inject(PersistenceService);

	login$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginStartAction),
				switchMap((action) =>
					this.authService.logIn(action.data).pipe(
						map((user) => loginSuccessAction({ user })),
						catchError((error: BackendErrors) => of(loginFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	register$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(registerStartAction),
				switchMap((action) =>
					this.authService.registerUser(action.data).pipe(
						map(({ id, activationCode }) => {
							this.persistenceService.setItem('id', String(id));
							this.persistenceService.setItem('code', String(activationCode));
							return registerSuccessAction({ id: String(id), code: String(activationCode) });
						}),
						catchError((error: BackendErrors) => of(registerFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	verify$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(verifyStartAction),
				switchMap((action) =>
					this.authService.activateUser(action.id, action.data).pipe(
						map((user) => verifySuccessAction({ user })),
						catchError((error: BackendErrors) => of(verifyFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);
}
