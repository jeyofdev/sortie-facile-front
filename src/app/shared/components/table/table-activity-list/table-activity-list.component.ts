import { Component, Input } from '@angular/core';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Component({
	selector: 'app-table-activity-list',
	templateUrl: './table-activity-list.component.html',
	styleUrl: './table-activity-list.component.scss',
})
export class TableActivityListComponent {
	@Input() activities!: ResponseActivity[];
}
