import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '@store/actions/auth/auth-action-types.enum';
import { BackendErrors, User, UserLogin } from '@types';

export const loginStartAction = createAction(AuthActionTypes.LOGIN_START, props<{ data: UserLogin }>());
export const loginSuccessAction = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{ user: User }>());
export const loginFailAction = createAction(AuthActionTypes.LOGIN_FAILED, props<{ error: BackendErrors }>());
