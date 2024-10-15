import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-account-settings-layout',
	templateUrl: './account-settings-layout.component.html',
	styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
}
