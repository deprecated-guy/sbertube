import { User } from '../user/user.interface';
import { CommentResponse } from '../comment/comment-response.type';

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
