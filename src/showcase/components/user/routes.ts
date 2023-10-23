import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'account', loadComponent: () => import('./user-page/user-page.component').then((c) => c.UserPageComponent) },
	{ path: 'library', loadComponent: () => import('./library/library.component').then((c) => c.LibraryComponent) },
];
