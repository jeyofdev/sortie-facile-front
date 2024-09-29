import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-header-icon',
	templateUrl: './button-header-icon.component.html',
	styleUrl: './button-header-icon.component.scss',
})
export class ButtonHeaderIconComponent implements OnInit {
	iconClass: string = 'pi';

	@Input({ required: true }) icon!: string;
	@Input({ required: true }) label!: string;
	@Input({ required: true }) subtitle!: string;
	@Input() badge!: number;

	ngOnInit(): void {
		this.iconClass += ' pi-' + this.icon;
	}
}
