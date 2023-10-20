import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PersistenceService } from '@shared/services';

export const authGuard: CanActivateFn = () => {
	const persistenceService = inject(PersistenceService);
	const token = persistenceService.getItem('token');
	const router = inject(Router);
	return token ? true : router.parseUrl('auth/register');
};
