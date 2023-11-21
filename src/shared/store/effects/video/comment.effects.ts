import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService, DislikeService, LikeService } from '@showcase/services';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackendErrors } from '@types';

import {
	addDislikeFailAction,
	addDislikeStartAction,
	addDislikeSuccessAction,
	addLikeFailAction,
	addLikeStartAction,
	addLikeSuccessAction,
} from 'src/shared/store/actions/reaction';
import {
	commendDeleteFail,
	commentDeleteStart,
	commentDeleteSuccess,
	getVideoCommentsFail,
	getVideoCommentsStart,
	getVideoCommentsSuccess,
	sendCommentFail,
	sendCommentStart,
	sendCommentSuccess,
	updateCommentFail,
	updateCommentStart,
	updateCommentSuccess,
} from '@store/actions/comment';

@Injectable()
export class CommentEffects {
	private readonly commentService = inject(CommentService);
	private readonly likeService = inject(LikeService);
	private readonly dislikeService = inject(DislikeService);
	private readonly actions$ = inject(Actions);

	sendComment$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(sendCommentStart),
				switchMap((state) =>
					this.commentService.createComment(state.data).pipe(
						map((comment) => sendCommentSuccess({ comment: comment })),
						catchError((error: BackendErrors) => of(sendCommentFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	editComment$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(updateCommentStart),
				switchMap((action) =>
					this.commentService.editComment(action.data).pipe(
						map((comment) => updateCommentSuccess({ comment })),
						catchError((error: BackendErrors) => of(updateCommentFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	deleteComment$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(commentDeleteStart),
				switchMap((state) =>
					this.commentService.deleteComment(state.id, state.videoId).pipe(
						map(() => commentDeleteSuccess),
						catchError((error: BackendErrors) => of(commendDeleteFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	getCVideoComments$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(getVideoCommentsStart),
				switchMap((state) =>
					this.commentService.getVideoComments(state.videoId).pipe(
						map((comments) => getVideoCommentsSuccess({ comments })),
						catchError((error: BackendErrors) => of(getVideoCommentsFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	likeComment$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addLikeStartAction),
				switchMap((state) =>
					this.likeService.addLikeToComment(state.data).pipe(
						map((like) => addLikeSuccessAction({ like })),
						catchError((error: BackendErrors) => of(addLikeFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	dislikeVideo$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addDislikeStartAction),
				switchMap((state) =>
					this.dislikeService.addDislikeToComment(state.data).pipe(
						map((dislike) => addDislikeSuccessAction({ dislike })),
						catchError((error: BackendErrors) => of(addDislikeFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);
}
