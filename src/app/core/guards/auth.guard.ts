import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthTokenService } from '@services/auth-token.service';
import { AccountRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { catchError, map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
	const router = inject(Router);
	const authTokenService = inject(AuthTokenService);

	return authTokenService.getTokenDetailsSubject$().pipe(
		map(tokenDetails => {
			// if user connected
			if (tokenDetails) {
				return router.createUrlTree([PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.HOME]);
			} else {
				return true;
			}
		}),
		catchError(() => {
			return of(true);
		}),
	);
};
