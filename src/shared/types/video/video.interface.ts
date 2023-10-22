import { User } from '@shared/types';
import { CommentResponse } from '@shared/types';

export interface Video {
	author: User;
	title: string;
	shortBody: string;
	body: string;
	path: string;
	comments: CommentResponse[];
	watchedTime: number;
	timeToWatch: number;
	likesCount: number;
}
