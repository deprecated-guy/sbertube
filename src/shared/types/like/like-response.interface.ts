import { Comment, User, Video } from '@shared/types';

export interface LikeResponse {
	like: Like;
}

export interface Like {
	id: number;
	author: User;
	createdAt: string;
	likedVideo: Video;
	likedComment: Comment;
}
