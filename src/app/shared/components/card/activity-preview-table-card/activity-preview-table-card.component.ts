import { Component, Input } from '@angular/core';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-activity-preview-table-card',
	templateUrl: './activity-preview-table-card.component.html',
	styleUrl: './activity-preview-table-card.component.scss',
})
export class ActivityPreviewTableCardComponent {
	@Input({ required: true }) activity!: ResponseActivity;
}
