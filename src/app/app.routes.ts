import { Routes } from '@angular/router';
import { authGuard, userAuthGuard } from '@shared/guards';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../showcase/components/welcome-page/welcome-page.component').then((c) => c.WelcomePageComponent),
	},
	{ path: 'home', redirectTo: '' },
	{
		path: 'auth',
		loadChildren: () => import('src/showcase/components/auth/routes').then((r) => r.routes),
		canActivate: [userAuthGuard],
	},
	{
		path: 'user',
		loadChildren: () => import('src/showcase/components/user/routes').then((r) => r.routes),
		canActivate: [authGuard],
	},
	{
		path: 'video',
		loadChildren: () => import('src/showcase/components/video/routes').then((r) => r.routes),
	},
	{
		path: 'video-editor',
		loadComponent: () =>
			import('../showcase/components/video/video-edit/video-edit.component').then((c) => c.VideoEditComponent),
		canActivate: [authGuard],
	},
	{
		path: '**',
		loadComponent: () => import('src/shared/pages/not-found/not-found.component').then((r) => r.NotFoundComponent),
	},
];
