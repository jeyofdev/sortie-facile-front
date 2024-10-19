import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-account-settings-content-element',
	templateUrl: './account-settings-content-element.component.html',
	styleUrl: './account-settings-content-element.component.scss',
})
export class AccountSettingsContentElementComponent implements OnInit {
	@Input({ required: true }) title!: string;
	@Input({ required: true }) content!: any;
	@Input() icon!: string;

	class!: any;

	ngOnInit(): void {
		this.class = 'pi pi-' + this.icon;
	}
}
