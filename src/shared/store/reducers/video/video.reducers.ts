import { createReducer, on } from '@ngrx/store';
import { VideoState } from '@store/state';
import {
	getUserVideosFail,
	getUserVideosStart,
	getUserVideosSuccess,
	getVideoByTitleFail,
	getVideoByTitleStart,
	getVideoByTitleSuccess,
	getVideosStart,
	getVideosSuccess,
	videoDeleteFail,
	videoDeleteStart,
	videoDeleteSuccess,
	videoEditFail,
	videoEditStart,
	videoEditSuccess,
	videoUploadFail,
	videoUploadStart,
	videoUploadSuccess,
} from '@store/actions/video';

const initialState: VideoState = {
	isLoading: null,
	video: null,
	error: null,
};

export const uploadVideoReducer = createReducer(
	initialState,
	on(videoUploadStart, (state) => ({
		...state,
		isLoading: true,
		error: null,
		user: null,
	})),
	on(videoUploadSuccess, (state, { video }) => ({
		...state,
		video: video,
		error: null,
		isLoading: false,
	})),
	on(videoUploadFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
	})),
);

export const editVideoReducer = createReducer(
	initialState,
	on(videoEditStart, (state) => ({
		...state,
		isLoading: state.isLoading,
		error: null,
		user: null,
		activationData: null,
	})),
	on(videoEditSuccess, (state, { video }) => ({
		...state,
		video: video,
		error: null,
		isLoading: false,
	})),
	on(videoEditFail, (state) => ({
		...state,
		user: null,
		error: state.error,
		isLoading: false,
		activationData: null,
	})),
);

export const deleteVideoReducer = createReducer(
	initialState,
	on(videoDeleteStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(videoDeleteSuccess, (state) => ({ ...state, video: null, error: null, isLoading: false })),
	on(videoDeleteFail, (state) => ({ ...state, video: state.video, error: state.error, isLoading: false })),
);

export const getUserVideosReducer = createReducer(
	initialState,
	on(getUserVideosStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(getUserVideosSuccess, (state, { videos }) => ({ ...state, video: videos, error: null, isLoading: false })),
	on(getUserVideosFail, (state) => ({ ...state, video: state.video, error: state.error, isLoading: false })),
);

export const getVideoByTitleReducer = createReducer(
	initialState,
	on(getVideoByTitleStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(getVideoByTitleSuccess, (state, { video }) => ({ ...state, video: video, error: null, isLoading: false })),
	on(getVideoByTitleFail, (state) => ({ ...state, video: state.video, error: state.error, isLoading: false })),
);

export const getVideosReducer = createReducer(
	initialState,
	on(getVideosStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(getVideosSuccess, (state, { videos }) => ({ ...state, video: videos, error: null, isLoading: false })),
	on(getVideoByTitleFail, (state) => ({ ...state, video: state.video, error: state.error, isLoading: false })),
);

export const geditVideosReducer = createReducer(
	initialState,
	on(videoEditStart, (state) => ({ ...state, isLoading: true, error: null, user: null })),
	on(videoDeleteSuccess, (state) => ({ ...state, video: state.video, error: null, isLoading: false })),
	on(videoEditFail, (state) => ({ ...state, video: state.video, error: state.error, isLoading: false })),
);
