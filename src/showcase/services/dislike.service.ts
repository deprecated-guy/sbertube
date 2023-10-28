import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersistenceService } from '@shared/services';
import { LikeRequest, LikeResponseInterface } from '@types';

import { map, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DislikeService {
	private httpRoute = 'http://localhost:3001/dislike/';
	private httpClient = inject(HttpClient);
	private persistenceService = inject(PersistenceService);

	public createDislike(data: LikeRequest) {
		return this.httpClient.post<LikeResponseInterface>(this.httpRoute, data).pipe(
			map((v) => v.like),

			tap((v) => this.persistenceService.setItem('likeId', `${v.id}`)),
		);
	}

	public deleteDislikeFromComment(commentId?: number) {
		const likeId = this.persistenceService.getItem('dislikeId');
		return this.httpClient.delete(this.httpRoute + `comment/${commentId}?=${likeId}`);
	}
	public deleteDislikeFromVideo(videoId?: number) {
		const likeId = this.persistenceService.getItem('likeId');
		return this.httpClient.delete(this.httpRoute + `video/${videoId}?=${likeId}`);
	}
}
