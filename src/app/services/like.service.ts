import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { LikeResponseInterface, LikeRequest } from '@types';
import { PersistenceService } from '@shared/services';

@Injectable({
	providedIn: 'root',
})
export class LikeService {
	private httpRoute = 'http://localhost:3001/like/';
	private httpClient = inject(HttpClient);
	private persistenceService = inject(PersistenceService);

	public createLike(data: LikeRequest) {
		return this.httpClient.post<LikeResponseInterface>(this.httpRoute, data).pipe(
			map((v) => v.like),

			tap((v) => this.persistenceService.setItem('likeId', `${v.id}`)),
		);
	}

	public deleteLikeFromComment(commentId?: number) {
		const likeId = this.persistenceService.getItem('likeId');
		return this.httpClient.delete(this.httpRoute + `comment/${commentId}?=${likeId}`);
	}

	public deleteLikeFromVideo(videoId?: number) {
		const likeId = this.persistenceService.getItem('likeId');
		return this.httpClient.delete(this.httpRoute + `video/${videoId}?=${likeId}`);
	}
}
