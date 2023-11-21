import { createSelector } from '@ngrx/store';
import { AuthState } from '@store/state';

const selectUser = (state: AuthState) => state;

export const registerSuccessSelector = createSelector(selectUser, (state) => state.activationData);

export const registerFailSelector = createSelector(selectUser, (state) => state.error);

export const verifySuccessSelector = createSelector(selectUser, (state) => state.user);

export const verifyFailSelector = createSelector(selectUser, (state) => state.error);

export const loginSuccessSelector = createSelector(selectUser, (state) => state.user);

export const loginSFailSelector = createSelector(selectUser, (state) => state.error);
