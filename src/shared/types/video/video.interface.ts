import { UserResponse } from '@shared/types';
import { CommentResponse } from '@shared/types';

export interface Video {
	id: number;
	author: UserResponse;
	alias: string;
	title: string;
	shortBody: string;
	body: string;
	path: string;
	watchDate: string;
	comments: CommentResponse[];
	uploadedAt: string;
	watchedTime: number;
	timeToWatch: number;
	likesCount: number;
	dislikesCount: number;
	isLiked: boolean;
	isDisliked: boolean;
}
