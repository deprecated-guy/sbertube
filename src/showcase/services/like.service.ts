import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { LikeResponse, LikeRequest } from '@types';
import { PersistenceService } from '@shared/services';

@Injectable({
	providedIn: 'root',
})
export class LikeService {
	private _httpRoute = 'http://localhost:3001/like/';
	private _httpClient = inject(HttpClient);
	private _persistenceService = inject(PersistenceService);

	public addLikeToVideo(data: LikeRequest) {
		return this._httpClient.post<LikeResponse>(this._httpRoute + `likeVideo/${data.videoId}`, {}).pipe(
			tap(console.log),
			map((v) => v.like),
			tap(console.log),
			tap((v) => console.log(v.id)),
			tap((v) => this._persistenceService.setItem('videoLikeId', `${v.id}`)),
		);
	}

	public addLikeToComment(data: LikeRequest) {
		return this._httpClient.post<LikeResponse>(this._httpRoute + `likeComment/${data.commentId}`, {}).pipe(
			tap(console.log),
			map((v) => v.like),
			tap(console.log),
			tap((v) => console.log(v.id)),
			tap((v) => this._persistenceService.setItem('commentLikeId', `${v.id}`)),
		);
	}
}
