import { ApplicationConfig, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { authInterceptor } from '@interceptors';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
	override = <unknown>{
		swipe: { direction: Hammer.DIRECTION_ALL },
	};
}

const maskConfig: Partial<IConfig> = {
	validation: false,
};

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideEnvironmentNgxMask(maskConfig),
		provideHttpClient(withInterceptors([authInterceptor])),
		{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
	],
};
