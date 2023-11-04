import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: ':username', loadComponent: () => import('./page/page.component').then((c) => c.PageComponent) },
	{
		path: ':username/library',
		loadComponent: () => import('./library/library.component').then((c) => c.LibraryComponent),
	},
];
