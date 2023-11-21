export const ActionTypes = {
	GET_COMMENTS_START: '[COMMENT] Get video comments start',
	GET_COMMENT_SUCCESS: '[COMMENT] Get video comments success',
	GET_COMMENT_FAIL: '[COMMENT] Get  video comments fail',
	SEND_COMMENT_START: '[COMMENT] Send comment start',
	SEND_COMMENT_SUCCESS: '[COMMENT] Send comment success',
	SEND_COMMENT_FAIL: '[COMMENT] Upload fail',
	EDIT_COMMENT_START: '[COMMENT] Update start',
	EDIT_COMMENT_FAIL: '[COMMENT] Update fail',
	EDIT_COMMENT_SUCCESS: '[COMMENT] Update success',
	DELETE_COMMENT_START: '[COMMENT] Delete start',
	DELETE_COMMENT_SUCCESS: '[COMMENT] Delete success',
	DELETE_COMMENT_FAIL: '[COMMENT] Delete fail',
} as const;
