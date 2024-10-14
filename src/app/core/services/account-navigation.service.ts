import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { AccountEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';

@Injectable({
	providedIn: 'root',
})
export class AccountNavigationService {
	constructor(private _authService: AuthService) {}
	getPrimaryNavigation(): MenuItem[] {
		return [
			{
				label: 'Home',
				icon: 'pi pi-home',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.HOME],
			},
			{
				label: 'Activities',
				icon: 'pi pi-list-check',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.ACTIVITIES],
			},
			{
				label: 'Favorites',
				icon: 'pi pi-star',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.FAVORITES],
			},
			{
				label: 'Messages',
				icon: 'pi pi-inbox',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.MESSAGES],
			},
			{
				label: 'Settings',
				icon: 'pi pi-cog',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS],
			},
			{
				label: 'Logout',
				icon: 'pi pi-sign-out',
				command: () => this._authService.logout(),
			},
		];
	}
}
