import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-settings-password-page',
	templateUrl: './account-settings-password-page.component.html',
	styleUrl: './account-settings-password-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsPasswordPageComponent implements OnInit, OnDestroy {
	isViewDatas!: boolean;
	isViewDataChecked!: boolean;

	private _passwordIsViewDatasSubscription: Subscription = new Subscription();
	private _passwordIsViewDataCheckedSubscription: Subscription = new Subscription();

	constructor(private _settingsService: SettingsService) {}

	ngOnInit(): void {
		this._passwordIsViewDatasSubscription = this._settingsService.passwordIsViewDatas$.subscribe(value => {
			this.isViewDatas = value;
		});
		this._passwordIsViewDatasSubscription = this._settingsService.passwordIsViewDataChecked$.subscribe(value => {
			this.isViewDataChecked = value;
		});
	}

	onChangeView(): void {
		this._settingsService.setPasswordIsViewDatas(!this.isViewDatas);
		this._settingsService.setPasswordIsViewDataChecked(!this.isViewDataChecked);
	}

	ngOnDestroy(): void {
		this._passwordIsViewDatasSubscription.unsubscribe();
		this._passwordIsViewDataCheckedSubscription.unsubscribe();
	}
}
