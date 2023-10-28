import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { PersistenceService } from '@shared/services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const persistence = inject(PersistenceService);
	const token = persistence.getItem('token');

	req = req.clone({
		headers: req.headers.set('Authorization', `Bearer ${token}`),
	});
	return next(req);
};
