import { AuthState } from '@store/state';
import { createReducer, on } from '@ngrx/store';
import {
	registerFailAction,
	registerStartAction,
	registerSuccessAction,
	verifyFailAction,
	verifyStartAction,
	verifySuccessAction,
} from '@store/actions';
import { loginFailAction, loginStartAction, loginSuccessAction } from '@store/actions/auth/login.action';

export const initialState: AuthState = {
	isLoading: null,
	activationData: null,
	user: null,
	error: null,
};

export const registerReducer = createReducer(
	initialState,
	on(registerStartAction, (state) => ({
		...state,
		isLoading: state.isLoading,
		error: null,
		user: null,
		activationData: null,
	})),
	on(registerSuccessAction, (state) => ({
		...state,
		user: null,
		error: null,
		isLoading: false,
		activationData: state.activationData,
	})),
	on(registerFailAction, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
		activationData: null,
	})),
);

export const verifyReducer = createReducer(
	initialState,
	on(verifyStartAction, (state) => ({
		...state,
		isLoading: state.isLoading,
		error: null,
		user: null,
		activationData: null,
	})),
	on(verifySuccessAction, (state, { user }) => ({
		...state,
		user: user,
		error: null,
		isLoading: false,
	})),
	on(verifyFailAction, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
		activationData: null,
	})),
);

export const loginReducer = createReducer(
	initialState,
	on(loginStartAction, (state) => ({ ...state, isLoading: state.isLoading, error: null, user: null })),
	on(loginSuccessAction, (state) => ({ ...state, user: state.user, error: null, isLoading: false })),
	on(loginFailAction, (state) => ({ ...state, user: null, error: state.error, isLoading: false })),
);
