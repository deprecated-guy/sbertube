import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '**',
		loadComponent: () => import('src/shared/pages/not-found/not-found.component').then((r) => r.NotFoundComponent),
	},
];
