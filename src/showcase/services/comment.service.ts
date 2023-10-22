import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CommentInput, CommentResponse } from '@types';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	private httpRoute = 'http://localhost:3001/comment';
	private httpClient = inject(HttpClient);
	public createComment(data: CommentInput) {
		return this.httpClient.post<CommentResponse>(this.httpRoute, data).pipe(map((v) => v.comment));
	}
	public editComment(data: CommentInput) {
		return this.httpClient.put<CommentResponse>(this.httpRoute, data).pipe(map((v) => v.comment));
	}

	public deleteComment(id: number): Observable<ArrayBuffer> {
		return this.httpClient.delete<ArrayBuffer>(this.httpRoute + `/${id}`);
	}
}
