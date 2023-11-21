import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '@store/actions/auth/auth-action-types.enum';
import { BackendErrors, User } from '@types';

export const verifyStartAction = createAction(AuthActionTypes.VERIFY_START, props<{ code: number; id: number }>());

export const verifySuccessAction = createAction(AuthActionTypes.VERIFY_SUCCESS, props<{ user: User }>());

export const verifyFailAction = createAction(AuthActionTypes.VERIFY_FAIL, props<{ error: BackendErrors }>());
