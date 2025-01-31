import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '@services/activity.service';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-account-update-activity-page',
	templateUrl: './account-update-activity-page.component.html',
	styleUrl: './account-update-activity-page.component.scss',
})
export class AccountUpdateActivityPageComponent {
	activity$!: Observable<ResponseActivity>;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _activityService: ActivityService,
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe(params => {
			this.activity$ = this._activityService.getActivityById$(params['activityId']);
		});
	}
}
