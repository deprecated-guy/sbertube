import { createAction, props } from '@ngrx/store';
import { AuthorActionTypes } from '@store/actions';
import { BackendErrors, User } from '@types';

export const getAuthor = createAction(AuthorActionTypes.GET_AUTHOR_START, props<{ username: string }>());

export const getAuthorSuccess = createAction(AuthorActionTypes.GET_AUTHOR_SUCCESS, props<{ user: User }>());

export const getAuthorFail = createAction(AuthorActionTypes.GET_AUTHOR_FAIL, props<{ error: BackendErrors }>());
