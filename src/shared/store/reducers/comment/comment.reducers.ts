import { createReducer, on } from '@ngrx/store';

import {
	commendDeleteFail,
	commentDeleteStart,
	commentDeleteSuccess,
	sendCommentFail,
	sendCommentStart,
	sendCommentSuccess,
	updateCommentFail,
	updateCommentStart,
	updateCommentSuccess,
} from '@store/actions/comment';
import { CommentState } from '@store/state/comment';
import { addLikeFailAction, addLikeStartAction, addLikeSuccessAction } from '@store/actions';

const initialState: CommentState = {
	isLoading: null,
	comment: null,
	error: null,
};

export const sendCommentReducer = createReducer(
	initialState,
	on(sendCommentStart, (state) => ({
		...state,
		isLoading: true,
		error: null,
		comment: null,
	})),
	on(sendCommentSuccess, (state, { comment }) => ({
		...state,
		comment: comment.comment,
		error: null,
		isLoading: false,
	})),
	on(sendCommentFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
	})),
);

export const editCommentReducer = createReducer(
	initialState,
	on(updateCommentStart, (state) => ({
		...state,
		isLoading: state.isLoading,
		error: null,
		comment: null,
	})),
	on(updateCommentSuccess, (state, { comment }) => ({
		...state,
		comment: comment,
		error: null,
		isLoading: false,
	})),
	on(updateCommentFail, (state) => ({
		...state,
		comment: null,
		error: state.error,
		isLoading: false,
		activationData: null,
	})),
);

export const deleteComment = createReducer(
	initialState,
	on(commentDeleteStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(commentDeleteSuccess, (state) => ({ ...state, video: null, error: null, isLoading: false })),
	on(commendDeleteFail, (state) => ({ ...state, comment: state.comment, error: state.error, isLoading: false })),
);

export const likeComment = createReducer(
	initialState,
	on(addLikeStartAction, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(addLikeSuccessAction, (state) => ({ ...state, comment: null, error: null, isLoading: false })),
	on(addLikeFailAction, (state) => ({ ...state, comment: state.comment, error: state.error, isLoading: false })),
);
