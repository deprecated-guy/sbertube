import { BackendErrors, CommentResponse, VideoResponse } from '@types';

export interface LikeState {
	isLoading: boolean | null;
	likedVideo?: VideoResponse | null;
	likedComment?: CommentResponse | null;
	error: BackendErrors | null;
}
