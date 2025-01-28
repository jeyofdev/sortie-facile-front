import { Component, OnInit } from '@angular/core';
import { PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrl: './activities.component.scss',
})
export class ActivitiesComponent implements OnInit {
	items!: MenuItem[];

	ngOnInit() {
		this.items = [
			{ label: 'Home', routerLink: `/${PrimaryRouteEnum.HOME}` },
			{ label: 'Activity', routerLink: `/${PrimaryRouteEnum.ACTIVITY}` },
		];
	}
}
