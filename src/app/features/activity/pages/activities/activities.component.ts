import { Component, OnInit } from '@angular/core';
import { ActivityService } from '@services/activity.service';
import { PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrl: './activities.component.scss',
})
export class ActivitiesComponent implements OnInit {
	items!: MenuItem[];
	activityList$!: Observable<ResponseActivity[]>;

	constructor(private activityService: ActivityService) {}

	ngOnInit() {
		this.items = [
			{ label: 'Home', routerLink: `/${PrimaryRouteEnum.HOME}` },
			{ label: 'Activity', routerLink: `/${PrimaryRouteEnum.ACTIVITY}` },
		];

		this.activityList$ = this.activityService.getAllActivities$();
	}
}
