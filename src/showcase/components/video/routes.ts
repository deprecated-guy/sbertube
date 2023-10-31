import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: ':title',
		loadComponent: () => import('./page/page.component').then((c) => c.PageComponent),
	},
];
