import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountEnum, PrimaryRouteEnum, SettingsEnum } from '@shared/enums/routes.enum';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-settings-page',
	templateUrl: './account-settings-page.component.html',
	styleUrl: './account-settings-page.component.scss',
})
export class AccountSettingsPageComponent implements OnInit {
	items!: MenuItem[];
	activeItem!: MenuItem;

	constructor(private _router: Router) {}

	ngOnInit() {
		this.items = [
			{
				label: 'Home',
				// icon: 'pi pi-home',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.PERSONAL],
			},
			{
				label: 'Address',
				// icon: 'pi pi-star',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.ADDRESS],
			},
			{
				label: 'Contact',
				// icon: 'pi pi-search',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.CONTACT],
			},
			{
				label: 'Description',
				// icon: 'pi pi-envelope',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.DESCRIPTION],
			},
			{
				label: 'Interests',
				// icon: 'pi pi-envelope',
				routerLink: ['/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.SETTINGS + '/' + SettingsEnum.INTERESTS],
			},
		];

		this.setActiveItemBasedOnUrl();
	}

	selectItem(item: MenuItem) {
		this.activeItem = item;
	}

	setActiveItemBasedOnUrl() {
		const currentUrl = this._router.url;
		console.log(currentUrl);

		this.activeItem = this.items.find(item => item.routerLink.includes(currentUrl)) || this.items[0];
	}
}
