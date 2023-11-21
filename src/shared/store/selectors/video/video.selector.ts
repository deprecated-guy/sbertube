import { createSelector } from '@ngrx/store';
import { VideoState } from '@store/state';
import { LikeState } from '@store/state/like';

const selectState = (state: VideoState) => state;
const selectLikeState = (state: LikeState) => state;

export const uploadVideoStartSelector = createSelector(selectState, (state) => state.isLoading);

export const uploadVideoSuccessSelector = createSelector(selectState, (state) => state.video);

export const uploadVideoFailSelector = createSelector(selectState, (state) => state.error);

export const editVideoStartSelector = createSelector(selectState, (state) => state.isLoading);

export const editVideoSuccessSelector = createSelector(selectState, (state) => state.video);

export const editVideoFailSelector = createSelector(selectState, (state) => state.error);

export const deleteVideoStartSelector = createSelector(selectState, (state) => state.isLoading);

export const deleteVideoSuccessSelector = createSelector(selectState, (state) => state.video);

export const deleteVideoFailSelector = createSelector(selectState, (state) => state.error);

export const getVideosStartSelector = createSelector(selectState, (state) => state.isLoading);

export const getVideosSuccessSelector = createSelector(selectState, (state) => state.video);

export const getVideosFailSelector = createSelector(selectState, (state) => state.error);

export const getUserVideosSelector = createSelector(selectState, (state) => state.video);

export const getUserVideosFailSelector = createSelector(selectState, (state) => state.error);

export const geVideoByTitleStartSelector = createSelector(selectState, (state) => state.isLoading);

export const geVideoByTitleSelector = createSelector(selectState, (state) => state.video);

export const geVideoByTitleFailSelector = createSelector(selectState, (state) => state.error);

export const likeVideoSelector = createSelector(selectLikeState, (state) => state.likedVideo);

export const likeVideoFail = createSelector(selectLikeState, (state) => state.error);
