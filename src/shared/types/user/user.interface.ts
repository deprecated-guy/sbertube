import { CommentResponse, VideoResponse } from '@shared/types';

export interface User {
	isVideoLiked: boolean;
	isVideoDisliked: boolean;
	isCommentDisliked: boolean;
	bio: string;
	isCommentLiked: boolean;
	email: string;
	password: string;
	token: string;
	username: string;
	comments: CommentResponse[];
	videos: VideoResponse[];
	watchedVideos: VideoResponse[];
	activationCode: string;
	bannerBackground: string;
	bannerBackgroundImage: string;
	avatarBackground: string;
	avatarBackgroundImage: string;
	registerDate: string;
	userAbout: string;
}
