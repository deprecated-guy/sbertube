export const UserActionTypes = {
	GET_USER_START: '[USER] Get current user start',
	GET_USER_SUCCESS: '[USER] Get current user success',
	GET_USER_FAIL: '[USER] Get current user fail',
	EDIT_USER_START: '[USER] Edit current user start',
	EDIT_USER_SUCCESS: '[USER] Edit current user success',
	EDIT_USER_FAIL: '[USER] Edit current user fail',
	DELETE_USER_START: '[USER] Delete current user start',
	DELETE_USER_SUCCESS: '[USER] Delete current user success',
	DELETE_USER_FAIL: '[USER] Delete current user fail',
} as const;

export const AuthorActionTypes = {
	GET_AUTHOR_FAIL: '[USER] Get author fail',
	GET_AUTHOR_START: '[USER] Get author start',
	GET_AUTHOR_SUCCESS: '[USER] Get author success',
} as const;
