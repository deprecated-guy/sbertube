import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User, UserRegister, UserLogin, UserResponse, ActivationReq } from '@types';
import { mapUser } from './mappers';
import { PersistenceService } from '@shared/services';
import { RegisterResponse } from '@shared/types/register-response.type';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _httpClient = inject(HttpClient);
	private _persistenceService = inject(PersistenceService);
	private _httpRoute = 'http://localhost:3001/auth';

	public registerUser(data: UserRegister): Observable<RegisterResponse> {
		return this._httpClient.post<RegisterResponse>(this._httpRoute + '/register', data).pipe(tap(console.log));
	}

	public activateUser(id: string, code: ActivationReq) {
		return this._httpClient.post<UserResponse>(this._httpRoute + `/activate/${id}`, code).pipe(
			map((data) => data.user),
			tap((user) => {
				this._persistenceService.setItem('token', user.token);
			}),
		);
	}

	public logIn(data: UserLogin): Observable<User> {
		return this._httpClient.post<UserResponse>(this._httpRoute + '/login', data).pipe(
			map((data: UserResponse) => mapUser(data)),
			tap(this._persistenceService.clean),
			tap((data: User) => this._persistenceService.setItem('token', data.token)),
		);
	}
}
