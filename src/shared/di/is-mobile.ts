import { distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';
import { InjectionToken } from '@angular/core';

const isMobileFactory = (): Observable<boolean> => {
	const minWidth = 768;
	const minHeight = 500;
	const dpr = window.devicePixelRatio || 1;

	return fromEvent(window, 'resize').pipe(
		map(() => window.innerWidth || window.innerHeight),
		map((width: number) => width <= minWidth * dpr || window.innerHeight <= minHeight * dpr),
		distinctUntilChanged(),
		startWith(window.innerWidth <= minWidth * dpr || window.innerHeight <= minHeight * dpr),
	);
};

export const IS_MOBILE = new InjectionToken<Observable<boolean>>('', {
	factory: isMobileFactory,
	providedIn: 'root',
});
