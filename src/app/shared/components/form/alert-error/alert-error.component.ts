import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-alert-error',
	templateUrl: './alert-error.component.html',
	styleUrl: './alert-error.component.scss',
})
export class AlertErrorComponent implements OnInit {
	@Input({ required: true }) severity!: 'info' | 'warn' | 'error' | 'success';
	@Input({ required: true }) content!: string;
	@Input({ required: true }) icon!: string;

	iconClass: string = 'pi';

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.icon;
	}
}
