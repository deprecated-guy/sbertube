import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@showcase/services';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackendErrors } from '@types';
import {
	deleteUserFail,
	deleteUserStart,
	deleteUserSuccess,
	editUserFail,
	editUserStart,
	editUserSuccess,
	getCurrentUserFail,
	getCurrentUserStart,
	getCurrentUserSuccess,
} from '@store/actions';

@Injectable()
export class UserEffects {
	private readonly userService = inject(UserService);
	private readonly actions$ = inject(Actions);

	getCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getCurrentUserStart),
			switchMap(() =>
				this.userService.getCurrentUser().pipe(
					map((user) => getCurrentUserSuccess({ user: { ...user } })),
					catchError((error: BackendErrors) => of(getCurrentUserFail({ error }))),
				),
			),
		),
	);

	editUser$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(editUserStart),
				switchMap((action) =>
					this.userService.editUser(action.data).pipe(
						map((user) => editUserSuccess({ user })),
						catchError((error: BackendErrors) => of(editUserFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	deleteUser$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(deleteUserStart),
				switchMap(() =>
					this.userService.deleteUser().pipe(
						map(() => deleteUserSuccess()),
						catchError((error: BackendErrors) => of(deleteUserFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);
}
