import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private _messageService: MessageService) {}

	showSuccess(detail: string) {
		this._messageService.add({
			severity: 'success',
			detail: detail,
			icon: 'pi pi-check',
		});
	}
}
