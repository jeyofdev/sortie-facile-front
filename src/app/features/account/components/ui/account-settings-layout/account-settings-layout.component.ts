import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-account-settings-layout',
	templateUrl: './account-settings-layout.component.html',
	styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input() showEditCta!: boolean;
	@Input() showSwitchInput!: boolean;

	@Input() isViewDatas: boolean = false;
	@Input() isViewDataChecked!: boolean;

	@Output() changeView: EventEmitter<void> = new EventEmitter<void>();

	onChangeView(): void {
		this.changeView.emit();
	}
}
