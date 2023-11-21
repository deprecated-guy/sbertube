import { createSelector } from '@ngrx/store';
import { UserState } from '@store/state/user';

const selectState = (state: UserState) => state;

export const getCurrentUserSelector = createSelector(selectState, (state) => state[0].user);

export const editCurrentUserSuccessSelector = createSelector(selectState, (state) => state.user);

export const editCurrentUserFailSelector = createSelector(selectState, (state) => state.error);

export const getAuthorSuccessSelector = createSelector(selectState, (state) => state.user);

export const getAuthorFailSelector = createSelector(selectState, (state) => state.error);
