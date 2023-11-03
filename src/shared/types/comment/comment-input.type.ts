export type CommentInput = {
	videoTitle: string;
	body: string;
};

export type CommentEdit = {
	body: string;
	id?: number;
	isEdited: boolean;
	editedAt: string;
};
