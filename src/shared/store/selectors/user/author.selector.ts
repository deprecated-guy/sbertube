import { createSelector } from '@ngrx/store';
import { UserState } from '@store/state/user';

const selectState = (state: UserState) => state;

export const authorSelector = createSelector(selectState, (state) => state[0].user);

export const authorFailSelector = createSelector(selectState, (state) => state.user);
