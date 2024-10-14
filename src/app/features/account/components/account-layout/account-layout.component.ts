import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountNavigationService } from '@services/account-navigation.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-layout',
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit {
	items!: MenuItem[];

	activeItem!: MenuItem;

	constructor(
		private _router: Router,
		private _accountNavigationService: AccountNavigationService,
	) {}

	ngOnInit(): void {
		this.items = this._accountNavigationService.getPrimaryNavigation();
		this.setActiveItemBasedOnUrl();
	}

	selectItem(item: any) {
		this.activeItem = item;
	}

	setActiveItemBasedOnUrl() {
		const currentUrl = this._router.url;
		console.log(currentUrl);

		this.activeItem = this.items.find(item => item.routerLink.includes(currentUrl)) || this.items[0];
	}
}
