import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthTokenService } from '@services/auth-token.service';
import { RoleEnum } from '@shared/enums/role.enum';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { catchError, map, Observable, of } from 'rxjs';

export const userGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
	const router = inject(Router);
	const authTokenService = inject(AuthTokenService);

	return authTokenService.getTokenDetailsSubject$().pipe(
		map((decodedToken: any) => decodedToken.role),
		map((role: RoleEnum) => {
			if (role === RoleEnum.ADMIN || role === RoleEnum.USER) {
				return true;
			} else {
				return router.createUrlTree([PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN]);
			}
		}),
		catchError(() => {
			return of(router.createUrlTree([PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN]));
		}),
	);
};
