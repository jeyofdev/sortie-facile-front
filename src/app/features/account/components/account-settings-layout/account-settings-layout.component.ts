import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-account-settings-layout',
	templateUrl: './account-settings-layout.component.html',
	styleUrl: './account-settings-layout.component.scss',
})
export class AccountSettingsLayoutComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input() isViewDatas!: boolean;
	@Input() showEditCta!: boolean;

	@Output() sendIsViewDatas: EventEmitter<boolean> = new EventEmitter(this.isViewDatas);

	onChangeView(): void {
		this.isViewDatas = !this.isViewDatas;
		this.sendIsViewDatas.emit(this.isViewDatas);
	}
}
