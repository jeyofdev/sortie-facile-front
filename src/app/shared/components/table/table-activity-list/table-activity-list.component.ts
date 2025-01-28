import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-table-activity-list',
	templateUrl: './table-activity-list.component.html',
	styleUrl: './table-activity-list.component.scss',
})
export class TableActivityListComponent {
	@Input() activities!: ResponseActivity[];
	@Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

	onDeleteClick(activityId: number) {
		this.deleteClicked.emit(activityId);
	}
}
