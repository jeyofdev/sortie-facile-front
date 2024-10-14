import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-layout',
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit {
	items!: MenuItem[];

	activeItem: any = null;

	ngOnInit(): void {
		this.items = [
			{
				label: 'Home',
				icon: 'pi pi-home',
			},
			{
				label: 'Activities',
				icon: 'pi pi-search',
			},
			{
				label: 'Favorites',
				icon: 'pi pi-search',
			},
			{
				label: 'Messages',
				icon: 'pi pi-search',
			},
			{
				label: 'Settings',
				icon: 'pi pi-search',
			},
			{
				label: 'Logout',
				icon: 'pi pi-search',
			},
		];

		this.activeItem = this.items[0];
	}

	selectItem(item: any) {
		this.activeItem = item;
	}
}
