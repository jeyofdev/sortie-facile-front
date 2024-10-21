import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-settings-description-page',
	templateUrl: './account-settings-description-page.component.html',
	styleUrl: './account-settings-description-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsDescriptionPageComponent implements OnInit, OnDestroy {
	isViewDatas!: boolean;

	private _descriptionIsViewDatasSubscription: Subscription = new Subscription();

	constructor(private _settingsService: SettingsService) {}

	ngOnInit(): void {
		this._descriptionIsViewDatasSubscription = this._settingsService.descriptionIsViewDatas$.subscribe(value => {
			this.isViewDatas = value;
		});
	}

	onChangeView(): void {
		this._settingsService.setDescriptionIsViewDatas(!this.isViewDatas);
	}

	ngOnDestroy(): void {
		this._descriptionIsViewDatasSubscription.unsubscribe();
	}
}
