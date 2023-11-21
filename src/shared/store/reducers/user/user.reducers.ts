import { createReducer, on } from '@ngrx/store';
import {
	deleteUserFail,
	deleteUserStart,
	deleteUserSuccess,
	editUserFail,
	editUserStart,
	editUserSuccess,
	getCurrentUserFail,
	getCurrentUserStart,
	getCurrentUserSuccess,
} from '@store/actions';
import { UserState } from '@store/state/user/user.state';

const initialState: UserState = {
	isLoading: null,
	user: null,
	error: null,
};

export const currentUserReducer = createReducer(
	initialState,
	on(getCurrentUserStart, (state) => ({
		...state,
		isLoading: true,
		error: null,
		user: null,
	})),
	on(getCurrentUserSuccess, (state, { user }) => ({
		...state,
		user: user,
		error: null,
		isLoading: false,
	})),
	on(getCurrentUserFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
	})),
);

export const editUserReducer = createReducer(
	initialState,
	on(editUserStart, (state) => ({
		...state,
		isLoading: state.isLoading,
		error: null,
		user: null,
		activationData: null,
	})),
	on(editUserSuccess, (state) => ({
		...state,
		user: state.user,
		error: null,
		isLoading: false,
	})),
	on(editUserFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
		activationData: null,
	})),
);

export const deleteUserReducer = createReducer(
	initialState,
	on(deleteUserStart, (state) => ({ ...state, isLoading: state.isLoading, error: null, user: null })),
	on(deleteUserSuccess, (state) => ({ ...state, user: null, error: null, isLoading: false })),
	on(deleteUserFail, (state) => ({ ...state, user: state.user, error: state.error, isLoading: false })),
);
