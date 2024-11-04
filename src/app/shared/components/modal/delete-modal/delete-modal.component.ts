import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-delete-modal',
	templateUrl: './delete-modal.component.html',
	styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent implements OnInit {
	@Input({ required: true }) icon!: string;

	iconClass: string = 'pi';

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.icon;
	}
}
