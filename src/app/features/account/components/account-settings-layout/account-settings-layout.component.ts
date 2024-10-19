import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-account-settings-layout',
	templateUrl: './account-settings-layout.component.html',
	styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input() isViewDatas!: boolean;
	@Input() isViewDataChecked!: boolean;
	@Input() showEditCta!: boolean;
	@Input() showSwitchInput!: boolean;

	@Output() sendIsViewDatas: EventEmitter<boolean> = new EventEmitter(this.isViewDatas);
	@Output() sendIsViewDataChecked: EventEmitter<boolean> = new EventEmitter(this.isViewDataChecked);

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
		this.isViewDataChecked = !this.isViewDatas;

		this.sendIsViewDatas.emit(this.isViewDatas);
		this.sendIsViewDataChecked.emit(this.isViewDataChecked);
	}
}
