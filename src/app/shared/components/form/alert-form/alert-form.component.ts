import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-alert-form',
	templateUrl: './alert-form.component.html',
	styleUrl: './alert-form.component.scss',
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
