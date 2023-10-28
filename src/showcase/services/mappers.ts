import { UserResponse, CommentResponse, User, Comment } from '@types';

export const mapUser = (user: UserResponse): User => {
	return user.user as User;
};

export const mapComments = (comments: CommentResponse[]): Comment[] => {
	return comments.map((v) => v.comment);
};
