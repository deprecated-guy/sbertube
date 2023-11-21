import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';
import { BackendErrors, Dislike, LikeRequest, LikeResponse } from '@types';

export const addLikeStartAction = createAction(ActionTypes.ADD_LIKE_START, props<{ data: LikeRequest }>());

export const addLikeSuccessAction = createAction(ActionTypes.ADD_LIKE_SUCCESS, props<{ like: LikeResponse }>());
export const addLikeFailAction = createAction(ActionTypes.ADD_LIKE_FAILED, props<{ error: BackendErrors }>());

export const addDislikeStartAction = createAction(ActionTypes.ADD_DISLIKE_START, props<{ data: LikeRequest }>());

export const addDislikeSuccessAction = createAction(ActionTypes.ADD_DISLIKE_SUCCESS, props<{ dislike: Dislike }>());

export const addDislikeFailAction = createAction(ActionTypes.ADD_DISLIKE_FAIL, props<{ error: BackendErrors }>());
