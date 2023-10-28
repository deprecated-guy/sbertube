import { Routes } from '@angular/router';
import { authGuard, userAuthGuard } from '@shared/guards';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../showcase/components/welcome-page/welcome-page.component').then((c) => c.WelcomePageComponent),
	},
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
];
