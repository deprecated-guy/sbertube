import { createAction, props } from '@ngrx/store';
import { UserActionTypes } from '@store/actions/user/action-types.enum';
import { BackendErrors, User, UserEdit } from '@types';

export const getCurrentUserStart = createAction(UserActionTypes.GET_USER_START);

export const getCurrentUserSuccess = createAction(UserActionTypes.GET_USER_SUCCESS, props<{ user: User }>());

export const getCurrentUserFail = createAction(UserActionTypes.GET_USER_FAIL, props<{ error: BackendErrors }>());

export const editUserStart = createAction(UserActionTypes.EDIT_USER_START, props<{ data: UserEdit }>());

export const editUserSuccess = createAction(UserActionTypes.EDIT_USER_SUCCESS, props<{ user: User }>());

export const editUserFail = createAction(UserActionTypes.EDIT_USER_FAIL, props<{ error: BackendErrors }>());

export const deleteUserStart = createAction(UserActionTypes.DELETE_USER_START, props<{ data: UserEdit }>);

export const deleteUserSuccess = createAction(UserActionTypes.DELETE_USER_SUCCESS, props<{ user: null }>);

export const deleteUserFail = createAction(UserActionTypes.DELETE_USER_FAIL, props<{ error: BackendErrors }>());
