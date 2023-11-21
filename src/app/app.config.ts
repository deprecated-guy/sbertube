import { ApplicationConfig, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { authInterceptor } from '@interceptors';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import {
	currentUserReducer,
	deleteUserReducer,
	deleteVideoReducer,
	editUserReducer,
	editVideoReducer,
	loginReducer,
	registerReducer,
	uploadVideoReducer,
} from '@shared/store/reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects, UserEffects } from '@shared/store/effects';
import { VideoEffects } from '@shared/store/effects/comment';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
		provideStore([loginReducer, registerReducer]),
		provideStore([deleteUserReducer, editUserReducer, currentUserReducer]),
		provideStore([deleteVideoReducer, editVideoReducer, uploadVideoReducer]),
		provideEffects([UserEffects, AuthEffects, VideoEffects]),
		provideStoreDevtools({
			maxAge: 25,
		}),
	],
};
