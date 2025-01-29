import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '@services/activity.service';
import { PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-interest',
	templateUrl: './interest.component.html',
	styleUrl: './interest.component.scss',
})
export class InterestComponent implements OnInit {
	items!: MenuItem[];
	activityList$!: Observable<ResponseActivity[]>;
	layout: 'list' | 'grid' = 'grid';
	interest!: string;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private activityService: ActivityService,
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe(params => {
			const interest = params['interest'];
			this.interest = params['interest']
				.replace(/-/g, ' ')
				.split(' ')
				.map((e: string) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
				.join(' ');

			this.items = [
				{ label: 'Home', routerLink: `/${PrimaryRouteEnum.HOME}` },
				{ label: 'Activity', routerLink: `/${PrimaryRouteEnum.ACTIVITY}` },
				{ label: this.interest, routerLink: `/${PrimaryRouteEnum.ACTIVITY}/${interest}` },
			];

			this.activityList$ = this.activityService.getActivitiesByInterest$(this.interest);
		});
	}
}
