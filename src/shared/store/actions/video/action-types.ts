export const ActionTypes = {
	GET_VIDEOS_START: '[VIDEO] Get all videos start',
	GET_VIDEOS_SUCCESS: '[VIDEO] Get Get all videos success',
	GET_VIDEOS_FAIL: '[VIDEO] Get Get all videos fail',
	GET_VIDEO_BY_ID_START: '[VIDEO] Get by title start',
	GET_VIDEO_BY_ID_SUCCESS: '[VIDEO] Get by title success',
	GET_VIDEO_BY_ID_FAIL: '[VIDEO] Get by title fail',
	GET_USER_VIDEOS_START: '[VIDEO] Get user videos  start',
	GET_USER_VIDEOS_SUCCESS: '[VIDEO] Get user videos success',
	GET_USER_VIDEOS_FAIL: '[VIDEO] Get user videos fail',
	UPLOAD_VIDEO_START: '[VIDEO] Upload start',
	UPLOAD_VIDEO_SUCCESS: '[VIDEO] Upload success',
	UPLOAD_VIDEO_FAIL: '[VIDEO] Upload fail',
	EDIT_VIDEO_START: '[VIDEO] Update start',
	EDIT_VIDEO_FAIL: '[VIDEO] Update fail',
	EDIT_VIDEO_SUCCESS: '[VIDEO] Update success',
	DELETE_VIDEO_START: '[VIDEO] Delete start',
	DELETE_VIDEO_SUCCESS: '[VIDEO] Delete success',
	DELETE_VIDEO_FAIL: '[VIDEO] Delete fail',
} as const;
