import { Component, Input } from '@angular/core';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-activity-preview-card',
	templateUrl: './activity-preview-card.component.html',
	styleUrl: './activity-preview-card.component.scss',
})
export class ActivityPreviewCardComponent {
	@Input({ required: true }) activity!: ResponseActivity;
}
