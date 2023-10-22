import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../showcase/components/welcome-page/welcome-page.component').then((c) => c.WelcomePageComponent),
	},
	{
		path: 'auth',
		loadChildren: () => import('src/showcase/components/auth/routes').then((r) => r.routes),
	},
];
