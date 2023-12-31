import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse, UserEdit } from '@types';
import { mapUser } from './mappers';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _httpRoute = 'http://localhost:3001/user';
	private _httpClient = inject(HttpClient);

	public getCurrentUser(): Observable<User> {
		return this._httpClient.get<UserResponse>(this._httpRoute + '/account').pipe(map((user) => mapUser(user)));
	}

	public getUserByUsername(username: string) {
		return this._httpClient.get<UserResponse>(this._httpRoute + `/${username}`).pipe(map(mapUser));
	}

	public deleteUser() {
		return this._httpClient.delete(this._httpRoute + '/account/delete');
	}

	public editUser(data: UserEdit): Observable<User> {
		return this._httpClient.put<UserResponse>(this._httpRoute, data).pipe(map((user) => mapUser(user)));
	}

	public editBannerImage(data: FormData) {
		const url = this._httpRoute + '/account/updateBanner';
		return this._httpClient.put<UserResponse>(url, data).pipe(map((data) => data.user));
	}

	editAvatarImage(data: FormData) {
		const url = this._httpRoute + '/account/updateAvatar';
		return this._httpClient.put<UserResponse>(url, data).pipe(map((data) => data.user));
	}
}
