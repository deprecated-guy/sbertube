import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./component/welcome-page/welcome-page.component').then((c) => c.WelcomePageComponent),
	},
];
