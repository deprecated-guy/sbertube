import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@showcase/services';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackendErrors } from '@types';
import { getAuthor, getAuthorFail, getAuthorSuccess } from '@store/actions';

@Injectable()
export class AuthorEffects {
	private readonly userService = inject(UserService);
	private readonly actions$ = inject(Actions);

	getAuthor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getAuthor),
			switchMap((data) =>
				this.userService.getUserByUsername(data.username).pipe(
					map((user) => getAuthorSuccess({ user: { ...user } })),
					catchError((error: BackendErrors) => of(getAuthorFail({ error }))),
				),
			),
		),
	);
}
