import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class PersistenceService {
	public setItem(key: string, data: string) {
		localStorage.setItem(key, data);
	}
	public getItem(key: string) {
		const data = localStorage.getItem(key);
		return data !== null ? data : null;
	}
	public removeItem(key: string) {
		localStorage.removeItem(key);
	}
}
