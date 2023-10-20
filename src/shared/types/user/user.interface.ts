import { CommentResponse, VideoResponse } from '@services';

export interface User {
	email: string;
	password: string;
	token: string;
	username: string;
	comments: CommentResponse[];
	videos: VideoResponse[];
	watchedVideos: VideoResponse[];
	activationCode: string;
	bannerBackground: string;
	avatarBackground: string;
}
