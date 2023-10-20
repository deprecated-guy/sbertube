import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video, VideoResponse } from '@types';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class VideoLoaderService {
	private httpRoute = 'http://localhost:3001/video/';
	private http = inject(HttpClient);
	private destroy = inject(DestroyRef);
	private title = '';

	public sendVideo(data: FormData): Observable<Video> {
		return this.http.post<VideoResponse>(this.httpRoute, data).pipe(map((v) => v.video));
	}
	public getVideos(search?: string) {
		if (search) {
			return this.http.get<VideoResponse[]>(this.httpRoute + `?p=${search}`).pipe(map(this.mapVideos));
		}
		return this.http.get<VideoResponse[]>(this.httpRoute).pipe(map((v) => this.mapVideos(v)));
	}

	public getVideoByTitle(title$: Observable<string>): Observable<Video> {
		this.getTitleFromObservable(title$);
		const route = `${this.httpRoute}v/${this.title}`;
		return this.http.get<VideoResponse>(route).pipe(map((v) => v.video));
	}

	private getTitleFromObservable(obs$: Observable<string>) {
		obs$.subscribe((v) => (this.title = v));
	}

	private mapVideos = (videos: VideoResponse[]) => videos.map((video) => video.video);
}
