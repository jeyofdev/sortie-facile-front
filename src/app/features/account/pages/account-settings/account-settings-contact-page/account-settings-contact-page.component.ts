import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-settings-contact-page',
	templateUrl: './account-settings-contact-page.component.html',
	styleUrl: './account-settings-contact-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsContactPageComponent implements OnInit, OnDestroy {
	isViewDatas!: boolean;

	private _contactIsViewDatasSubscription: Subscription = new Subscription();

	constructor(private _settingsService: SettingsService) {}

	ngOnInit(): void {
		this._contactIsViewDatasSubscription = this._settingsService.contactIsViewDatas$.subscribe(value => {
			this.isViewDatas = value;
		});
	}

	onChangeView(): void {
		this._settingsService.setContactIsViewDatas(!this.isViewDatas);
	}

	ngOnDestroy(): void {
		this._contactIsViewDatasSubscription.unsubscribe();
	}
}
