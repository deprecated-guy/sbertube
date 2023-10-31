import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { LikeResponseInterface, LikeRequest } from '@types';
import { PersistenceService } from '@shared/services';

@Injectable({
	providedIn: 'root',
})
export class LikeService {
	private _httpRoute = 'http://localhost:3001/like/';
	private _httpClient = inject(HttpClient);
	private _persistenceService = inject(PersistenceService);

	public createLike(data: LikeRequest) {
		return this._httpClient.post<LikeResponseInterface>(this._httpRoute, data).pipe(
			tap(console.log),
			map((v) => v.like),
			tap(console.log),
			tap((v) => console.log(v.id)),
			tap((v) => this._persistenceService.setItem('likeId', `${v.id}`)),
		);
	}

	public deleteLikeFromComment(commentId?: number) {
		const likeId = this._persistenceService.getItem('likeId');
		return this._httpClient.delete(this._httpRoute + `comment/${commentId}?likeId=${likeId}`);
	}

	public deleteLikeFromVideo(videoId: number) {
		const likeId = this._persistenceService.getItem('likeId');
		const route = this._httpRoute + `video/${videoId}?likeId=${likeId}`;
		return this._httpClient.delete<string>(route).pipe(tap(console.log));
	}
}
