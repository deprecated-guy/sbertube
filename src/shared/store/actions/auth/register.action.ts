import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '@store/actions/auth/auth-action-types.enum';
import { ActivationReq, BackendErrors, User, UserRegister } from '@types';

export const registerStartAction = createAction(AuthActionTypes.REGISTER_START, props<{ data: UserRegister }>());
export const registerSuccessAction = createAction(
	AuthActionTypes.REGISTER_SUCCESS,
	props<{ id: string; code: string }>(),
);
export const registerFailAction = createAction(AuthActionTypes.REGISTER_FAIL, props<{ error: BackendErrors }>());

export const verifyStartAction = createAction(
	AuthActionTypes.VERIFY_START,
	props<{ id: number; data: ActivationReq }>(),
);

export const verifySuccessAction = createAction(AuthActionTypes.VERIFY_SUCCESS, props<{ user: User }>());
export const verifyFailAction = createAction(AuthActionTypes.VERIFY_FAIL, props<{ error: BackendErrors }>());
