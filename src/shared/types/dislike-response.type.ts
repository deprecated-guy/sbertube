import { VideoResponse } from '@shared/types/video';
import { CommentResponse } from '@shared/types/comment';

export interface DislikeResponse {
	dislike: Dislike;
}
export interface Dislike {
	id: number;
	dislikedVideo: VideoResponse;
	dislikedComment: CommentResponse;
}
