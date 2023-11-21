import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/actions/comment/action-types';
import { BackendErrors, Comment, CommentEdit, CommentInput, CommentResponse } from '@types';

export const sendCommentStart = createAction(ActionTypes.SEND_COMMENT_START, props<{ data: CommentInput }>());

export const sendCommentSuccess = createAction(ActionTypes.SEND_COMMENT_SUCCESS, props<{ comment: CommentResponse }>());

export const sendCommentFail = createAction(ActionTypes.SEND_COMMENT_FAIL, props<{ error: BackendErrors }>());

export const updateCommentStart = createAction(ActionTypes.EDIT_COMMENT_START, props<{ data: CommentEdit }>());

export const updateCommentSuccess = createAction(ActionTypes.EDIT_COMMENT_SUCCESS, props<{ comment: Comment }>());

export const updateCommentFail = createAction(ActionTypes.EDIT_COMMENT_FAIL, props<{ error: BackendErrors }>());

export const commentDeleteStart = createAction(
	ActionTypes.DELETE_COMMENT_START,
	props<{ id: number; videoId: number }>(),
);

export const commentDeleteSuccess = createAction(ActionTypes.DELETE_COMMENT_SUCCESS, props<{ comment: Comment }>);

export const commendDeleteFail = createAction(ActionTypes.DELETE_COMMENT_FAIL, props<{ error: BackendErrors }>());

export const getVideoCommentsStart = createAction(ActionTypes.GET_COMMENTS_START, props<{ videoId: number }>());

export const getVideoCommentsSuccess = createAction(ActionTypes.GET_COMMENT_SUCCESS, props<{ comments: Comment[] }>());

export const getVideoCommentsFail = createAction(ActionTypes.GET_COMMENT_FAIL, props<{ error: BackendErrors }>());
