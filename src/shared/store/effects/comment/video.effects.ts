import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DislikeService, LikeService, VideoLoader } from '@showcase/services';
import { catchError, map, of, switchMap } from 'rxjs';
import { BackendErrors } from '@types';

import {
	getUserVideosFail,
	getUserVideosStart,
	getUserVideosSuccess,
	getVideosFail,
	getVideosStart,
	getVideosSuccess,
	videoDeleteFail,
	videoDeleteStart,
	videoDeleteSuccess,
	videoEditFail,
	videoEditStart,
	videoEditSuccess,
	videoUploadFail,
	videoUploadStart,
	videoUploadSuccess,
} from '@store/actions/video';
import {
	addDislikeFailAction,
	addDislikeStartAction,
	addDislikeSuccessAction,
	addLikeFailAction,
	addLikeStartAction,
	addLikeSuccessAction,
} from 'src/shared/store/actions/reaction';

@Injectable()
export class VideoEffects {
	private readonly videoLoader = inject(VideoLoader);
	private readonly likeService = inject(LikeService);
	private readonly dislikeService = inject(DislikeService);
	private readonly actions$ = inject(Actions);

	uploadVideo$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(videoUploadStart),
				switchMap((state) =>
					this.videoLoader.sendVideo(state.data).pipe(
						map((video) => videoUploadSuccess({ video: video.video })),
						catchError((error: BackendErrors) => of(videoUploadFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	editVideo$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(videoEditStart),
				switchMap((action) =>
					this.videoLoader.updateVideo(action.data).pipe(
						map((video) => videoEditSuccess({ video })),
						catchError((error: BackendErrors) => of(videoEditFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	deleteVideo$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(videoDeleteStart),
				switchMap((state) =>
					this.videoLoader.deleteVideo(state.id).pipe(
						map(() => videoDeleteSuccess()),
						catchError((error: BackendErrors) => of(videoDeleteFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	getUserVideos$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(getUserVideosStart),
				switchMap((state) =>
					this.videoLoader.getUserVideos(state.username).pipe(
						map((videos) => getUserVideosSuccess({ videos })),
						catchError((error: BackendErrors) => of(getUserVideosFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	getVideos$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(getVideosStart),
				switchMap((state) =>
					this.videoLoader.getVideos(state.search).pipe(
						map((videos) => getVideosSuccess({ videos })),
						catchError((error: BackendErrors) => of(getVideosFail({ error }))),
					),
				),
			),
		{ dispatch: true },
	);

	likeVideo$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addLikeStartAction),
				switchMap((state) =>
					this.likeService.addLikeToVideo(state.data).pipe(
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
					this.dislikeService.addDislikeToVideo(state.data).pipe(
						map((dislike) => addDislikeSuccessAction({ dislike })),
						catchError((error: BackendErrors) => of(addDislikeFailAction({ error }))),
					),
				),
			),
		{ dispatch: true },
	);
}
