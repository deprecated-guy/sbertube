import { UserResponse } from '../user/user-response.interface';
import { VideoResponse } from '../video/video-response.type';
import { Like } from '../like/like-response.interface';

export interface Comment {
	id: number;
	title: string;
	createdAt: string;
	editedAt: string;
	isEdited: boolean;
	body: string;
	commentedVideo: VideoResponse;
	author: UserResponse;
	likes: Like[];
	likesCount: number;
	isLiked: boolean;
	isDisliked: boolean;
}
