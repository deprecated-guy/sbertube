import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '@store/actions/video/action-types';
import { BackendErrors, Video } from '@types';
import { EditVideo } from '@shared/types/video/edit-video.interface';

export const videoUploadStart = createAction(ActionTypes.EDIT_VIDEO_START, props<{ data: FormData }>());

export const videoUploadSuccess = createAction(ActionTypes.UPLOAD_VIDEO_SUCCESS, props<{ video: Video }>());

export const videoUploadFail = createAction(ActionTypes.UPLOAD_VIDEO_SUCCESS, props<{ error: BackendErrors }>());

export const videoEditStart = createAction(ActionTypes.EDIT_VIDEO_START, props<{ data: EditVideo }>());

export const videoEditSuccess = createAction(ActionTypes.EDIT_VIDEO_SUCCESS, props<{ video: Video }>());

export const videoEditFail = createAction(ActionTypes.EDIT_VIDEO_FAIL, props<{ error: BackendErrors }>());

export const videoDeleteStart = createAction(ActionTypes.DELETE_VIDEO_START, props<{ id: number }>());

export const videoDeleteSuccess = createAction(ActionTypes.DELETE_VIDEO_SUCCESS, props<{ video: Video }>);

export const videoDeleteFail = createAction(ActionTypes.DELETE_VIDEO_FAIL, props<{ error: BackendErrors }>());

export const getVideoByTitleStart = createAction(ActionTypes.GET_USER_VIDEOS_START, props<{ id: number }>());

export const getVideoByTitleSuccess = createAction(ActionTypes.GET_VIDEO_BY_ID_SUCCESS, props<{ video: Video }>());

export const getVideoByTitleFail = createAction(ActionTypes.GET_VIDEO_BY_ID_FAIL, props<{ error: BackendErrors }>());

export const getUserVideosStart = createAction(ActionTypes.GET_USER_VIDEOS_START, props<{ username: string }>());

export const getUserVideosSuccess = createAction(ActionTypes.GET_USER_VIDEOS_SUCCESS, props<{ videos: Video[] }>());

export const getUserVideosFail = createAction(ActionTypes.GET_USER_VIDEOS_FAIL, props<{ error: BackendErrors }>());

export const getVideosStart = createAction(ActionTypes.GET_VIDEOS_START, props<{ search: string }>());

export const getVideosSuccess = createAction(ActionTypes.GET_VIDEOS_SUCCESS, props<{ videos: Video[] }>());

export const getVideosFail = createAction(ActionTypes.GET_VIDEOS_FAIL, props<{ error: BackendErrors }>());
