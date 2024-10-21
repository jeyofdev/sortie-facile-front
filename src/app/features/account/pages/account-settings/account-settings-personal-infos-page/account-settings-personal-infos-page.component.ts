import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-settings-personal-infos-page',
	templateUrl: './account-settings-personal-infos-page.component.html',
	styleUrl: './account-settings-personal-infos-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsPersonalInfosPageComponent implements OnInit, OnDestroy {
	isViewDatasProfile!: boolean;
	isViewDatasAddress!: boolean;

	private _profileIsViewDatasSubscription: Subscription = new Subscription();
	private _addressIsViewDatasSubscription: Subscription = new Subscription();

	constructor(private _settingsService: SettingsService) {}

	ngOnInit(): void {
		this._profileIsViewDatasSubscription = this._settingsService.profileIsViewDatas$.subscribe(value => {
			this.isViewDatasProfile = value;
		});
		this._addressIsViewDatasSubscription = this._settingsService.addressIsViewDatas$.subscribe(value => {
			this.isViewDatasAddress = value;
		});
	}

	onChangeViewProfile(): void {
		this._settingsService.setProfileIsViewDatas(!this.isViewDatasProfile);
	}

	onChangeViewAddress(): void {
		this._settingsService.setAddressIsViewDatas(!this.isViewDatasAddress);
	}

	ngOnDestroy(): void {
		this._profileIsViewDatasSubscription.unsubscribe();
		this._addressIsViewDatasSubscription.unsubscribe();
	}
}
