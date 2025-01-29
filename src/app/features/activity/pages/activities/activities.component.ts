import { Component, OnInit } from '@angular/core';
import { ActivityService } from '@services/activity.service';
import { PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.component.html',
	styleUrl: './activities.component.scss',
	providers: [ConfirmationService],
})
export class ActivitiesComponent implements OnInit {
	items!: MenuItem[];
	activityList$!: Observable<ResponseActivity[]>;
	layout: 'list' | 'grid' = 'list';

	constructor(
		private activityService: ActivityService,
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
	) {}

	ngOnInit() {
		this.items = [
			{ label: 'Home', routerLink: `/${PrimaryRouteEnum.HOME}` },
			{ label: 'Activity', routerLink: `/${PrimaryRouteEnum.ACTIVITY}` },
		];

		this.activityList$ = this.activityService.getAllActivities$();
	}

	deleteActivity(activityId: number): void {
		this._confirmationService.confirm({
			message: 'You are about to delete an activity. Are you sure about your choice? This action is irreversible.',
			header: 'Delete activity',
			icon: 'pi pi-info-circle',
			acceptButtonStyleClass: 'p-button-danger p-button-text',
			rejectButtonStyleClass: 'p-button-text p-button-text',
			acceptIcon: 'none',
			rejectIcon: 'none',

			accept: () => {
				this._messageService.add({
					severity: 'success',
					detail: 'Activity deleted successfully.',
					icon: 'pi pi-check',
				});
			},
			reject: () => {
				// this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
			},
		});
	}
}
