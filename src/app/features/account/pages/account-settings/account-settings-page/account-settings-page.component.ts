import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountNavigationService } from '@services/account-navigation.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-settings-page',
	templateUrl: './account-settings-page.component.html',
	styleUrl: './account-settings-page.component.scss',
})
export class AccountSettingsPageComponent implements OnInit {
	items!: MenuItem[];
	activeItem!: MenuItem;

	constructor(
		private _router: Router,
		private _accountNavigationService: AccountNavigationService,
	) {}

	ngOnInit() {
		this.items = this._accountNavigationService.getSettingsNavigation();
		this.setActiveItemBasedOnUrl();
	}

	selectItem(item: MenuItem) {
		this.activeItem = item;
	}

	setActiveItemBasedOnUrl() {
		const currentUrl = this._router.url;
		this.activeItem = this.items.find(item => item.routerLink.includes(currentUrl)) || this.items[0];
	}
}
