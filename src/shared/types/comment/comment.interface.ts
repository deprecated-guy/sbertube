import { UserResponse } from '@shared/types';
import { VideoResponse } from '@shared/types';
import { Like } from '@shared/types';

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
