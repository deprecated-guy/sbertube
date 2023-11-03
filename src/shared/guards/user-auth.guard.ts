import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PersistenceService } from '@shared/services';

export const userAuthGuard: CanActivateFn = () => {
	const persistenceService = inject(PersistenceService);
	const token = persistenceService.getItem('token');
	const router = inject(Router);
	return !token || false ? true : router.parseUrl('account');
};
