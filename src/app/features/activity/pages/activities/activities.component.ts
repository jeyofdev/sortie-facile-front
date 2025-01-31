import { Component } from '@angular/core';
import { ActivityService } from '@services/activity.service';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
	activityList$!: Observable<ResponseActivity[]>;

	constructor(private activityService: ActivityService) {}

	ngOnInit() {
		this.activityList$ = this.activityService.getAllActivities$();
	}
}
