import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video, VideoResponse } from '@types';
import { map, Observable, tap } from 'rxjs';
import { EditVideo } from '@shared/types/video/edit-video.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
	providedIn: 'root',
})
export class VideoLoader {
	private _httpRoute = 'http://localhost:3001/video/';
	private _http = inject(HttpClient);

	public sendVideo(data: FormData): Observable<VideoResponse> {
		return this._http.post<VideoResponse>(this._httpRoute, data).pipe();
	}

	public getVideos(search?: string) {
		if (search) {
			return this._http.get<VideoResponse[]>(this._httpRoute + `?p=${search}`).pipe(map(this.mapVideos));
		}
		return this._http.get<VideoResponse[]>(this._httpRoute).pipe(map((v) => this.mapVideos(v)));
	}

	public getUserVideos(username: string) {
		return this._http.get<VideoResponse[]>(this._httpRoute + `author/${username}`).pipe(map(this.mapVideos));
	}

	public updateVideo(data: EditVideo) {
		return this._http.put<VideoResponse>(this._httpRoute + data.id, data).pipe(
			tap(console.log),
			map((res) => res.video),
		);
	}

	public getVideoByTitle(title$: Observable<string>): Observable<Video> {
		const title = toSignal(title$, { initialValue: '' });
		console.log(title);
		const route = this._httpRoute + `v/${title()}`;
		return this._http.get<VideoResponse>(route).pipe(
			tap(console.log),
			map((value) => value.video),
		);
	}

	public deleteVideo(id: number) {
		return this._http.get(this._httpRoute + `${id}`);
	}

	private mapVideos = (videos: VideoResponse[]) => videos.map((video) => video.video);
}
