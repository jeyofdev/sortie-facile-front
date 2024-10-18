import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { AccountEnum, AuthRouteEnum, PrimaryRouteEnum, SettingsEnum } from '@shared/enums/routes.enum';

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
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.PROFILE],
			},
			{
				label: 'Logout',
				icon: 'pi pi-sign-out',
				command: () => this._authService.logout(),
				routerLink: ['/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN],
			},
		];
	}

	getSettingsNavigation(): MenuItem[] {
		return [
			{
				label: 'Home',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.PROFILE],
			},
			{
				label: 'Password',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.PASSWORD],
			},
			{
				label: 'Contact',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.CONTACT],
			},
			{
				label: 'Description',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.DESCRIPTION],
			},
			{
				label: 'Interests',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.INTERESTS],
			},
		];
	}
}
