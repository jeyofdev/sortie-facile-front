import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-activity-preview-card',
	templateUrl: './activity-preview-card.component.html',
	styleUrl: './activity-preview-card.component.scss',
})
export class ActivityPreviewCardComponent {
	@Input({ required: true }) activity!: ResponseActivity;
	@Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

	onDeleteClick() {
		this.deleteClicked.emit(this.activity.id);
	}
}
