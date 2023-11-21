import { createReducer, on } from '@ngrx/store';
import { getAuthor, getAuthorFail, getAuthorSuccess } from '@store/actions';
import { UserState } from '@store/state/user/user.state';

const initialState: UserState = {
	isLoading: null,
	user: null,
	error: null,
};

export const authorReducer = createReducer(
	initialState,
	on(getAuthor, (state) => ({
		...state,
		isLoading: true,
		error: null,
		user: null,
	})),
	on(getAuthorSuccess, (state, { user }) => ({
		...state,
		user: user,
		error: null,
		isLoading: false,
	})),
	on(getAuthorFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
	})),
);
