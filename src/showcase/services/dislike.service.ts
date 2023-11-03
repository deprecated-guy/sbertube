import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersistenceService } from '@shared/services';
import { LikeRequest, DislikeResponse } from '@types';

import { map, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DislikeService {
	private _httpRoute = 'http://localhost:3001/dislike/';
	private _httpClient = inject(HttpClient);
	private _persistenceService = inject(PersistenceService);

	public addDislikeToVideo(data: LikeRequest) {
		return this._httpClient.post<DislikeResponse>(this._httpRoute + `dislikeVideo/${data.videoId}`, {}).pipe(
			tap((v) => console.log(v)),
			map((v) => v.dislike),
			tap((v) => console.log(v)),
			tap((v) => this._persistenceService.setItem('videoDislikeId', v.id.toString())),
		);
	}

	public addDislikeToComment(data: LikeRequest) {
		return this._httpClient.post<DislikeResponse>(this._httpRoute + `dislikeComment/${data.commentId}`, {}).pipe(
			tap((v) => console.log(v)),
			map((v) => v.dislike),
			tap((v) => console.log(v)),
			tap((v) => this._persistenceService.setItem('commentDislikeId', v.id.toString())),
		);
	}
}
