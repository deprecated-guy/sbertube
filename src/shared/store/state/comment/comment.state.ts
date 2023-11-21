import { BackendErrors, Comment } from '@types';

export interface CommentState {
	isLoading: boolean | null;
	comment: Comment | Comment[] | null;
	error: BackendErrors | null;
}
