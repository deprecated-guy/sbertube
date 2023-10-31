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

	public createDislike(data: LikeRequest) {
		return this._httpClient.post<DislikeResponse>(this._httpRoute, data).pipe(
			tap((v) => console.log(v)),
			map((v) => v.dislike),
			tap((v) => console.log(v)),
			tap((v) => this._persistenceService.setItem('dislikeId', v.id.toString())),
		);
	}

	public removeDislikeFromVideo(videoId: number) {
		const id = this._persistenceService.getItem('dislikeId') as string;
		const route = this._httpRoute + `video/${videoId}?likeId=${id}`;
		return this._httpClient.delete<string>(route).pipe(tap(console.log));
	}
}
