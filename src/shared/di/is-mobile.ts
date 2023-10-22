import { BehaviorSubject, distinctUntilChanged, fromEvent, map, Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

const isMobileFactory = (): Observable<boolean> => {
	const minWidth = 768;
	const dpr = window.devicePixelRatio;
	const isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth <= minWidth * dpr);
	fromEvent(window, 'resize')
		.pipe(
			map(() => window.innerWidth * dpr),
			map((width: number) => width <= minWidth * dpr),
			distinctUntilChanged(),
		)
		.subscribe((v) => {
			isMobileSubject.next(v);
		});
	return isMobileSubject.asObservable();
};

export const IS_MOBILE = new InjectionToken<Observable<boolean>>('', {
	factory: isMobileFactory,
	providedIn: 'root',
});

const checkIsLandscape = () => {
	const isLandscape = new BehaviorSubject<boolean>(window.matchMedia('(orientation: landscape)').matches);
	fromEvent(window, 'orientationchange')
		.pipe(
			map(() => window.matchMedia('(orientation: landscape)').matches),
			distinctUntilChanged(),
		)
		.subscribe((v) => isLandscape.next(v));
	return isLandscape.asObservable();
};

export const IS_LANDSCAPE = new InjectionToken<Observable<boolean>>('', {
	providedIn: 'root',
	factory: checkIsLandscape,
});
