import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { AccountRouteEnum, AuthRouteEnum, PrimaryRouteEnum, SettingsRouteEnum } from '@shared/enums/routes.enum';

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
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.HOME],
			},
			{
				label: 'Activities',
				icon: 'pi pi-list-check',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES],
			},
			{
				label: 'Favorites',
				icon: 'pi pi-star',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.FAVORITES],
			},
			{
				label: 'Messages',
				icon: 'pi pi-inbox',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.MESSAGES],
			},
			{
				label: 'Settings',
				icon: 'pi pi-cog',
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.PROFILE,
				],
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
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.PROFILE,
				],
			},
			{
				label: 'Password',
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.PASSWORD,
				],
			},
			{
				label: 'Contact',
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.CONTACT,
				],
			},
			{
				label: 'Description',
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.DESCRIPTION,
				],
			},
			{
				label: 'Interests',
				routerLink: [
					'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.SETTINGS + '/' + SettingsRouteEnum.INTERESTS,
				],
			},
		];
	}
}
