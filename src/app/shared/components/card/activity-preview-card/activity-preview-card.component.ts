import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountActivityRouteEnum, AccountRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-activity-preview-card',
	templateUrl: './activity-preview-card.component.html',
	styleUrl: './activity-preview-card.component.scss',
})
export class ActivityPreviewCardComponent {
	@Input({ required: true }) activity!: ResponseActivity;
	@Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

	constructor(private _router: Router) {}

	onDeleteClick() {
		this.deleteClicked.emit(this.activity.id);
	}

	redirectTo(): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.ACCOUNT +
				'/' +
				AccountRouteEnum.ACTIVITIES +
				'/' +
				AccountActivityRouteEnum.UPDATE +
				'/' +
				this.activity.id,
		);
	}
}
