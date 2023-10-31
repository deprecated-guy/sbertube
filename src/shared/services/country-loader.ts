import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '@types';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CountryLoader {
	private _path = 'src/assets/menu-icons/country-list.json';
	private _httpClient = inject(HttpClient);

	public getCountries() {
		return this._httpClient.get<Country[]>(this._path).pipe(tap(console.log));
	}

	public getCountryImage(long: number, lat: number) {
		return this._httpClient
			.get<Country>(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${long}&latitude=${lat}&localityLanguage=en`,
			)
			.pipe(tap(console.log));
	}
}
