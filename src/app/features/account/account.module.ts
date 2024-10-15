import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@features/account/account-routing.module';
import { AccountHomePageComponent } from '@features/account/pages/account-home-page/account-home-page.component';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from '@features/account/components/account-container/account-container.component';
import { AccountLayoutComponent } from '@features/account/components/account-layout/account-layout.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountSettingsPageComponent } from '@features/account/pages/account-settings/account-settings-page/account-settings-page.component';
import { AccountActivitiesPageComponent } from '@features/account/pages/account-activities-page/account-activities-page.component';
import { AccountSettingsPasswordPageComponent } from './pages/account-settings/account-settings-password-page/account-settings-password-page.component';
import { AccountSettingsPersonalInfosPageComponent } from './pages/account-settings/account-settings-personal-infos-page/account-settings-personal-infos-page.component';
import { AccountSettingsContactPageComponent } from './pages/account-settings/account-settings-contact-page/account-settings-contact-page.component';
import { AccountSettingsDescriptionPageComponent } from './pages/account-settings/account-settings-description-page/account-settings-description-page.component';
import { AccountSettingsInterestsPageComponent } from './pages/account-settings/account-settings-interests-page/account-settings-interests-page.component';
import { AccountSettingsAddressPageComponent } from './pages/account-settings/account-settings-address-page/account-settings-address-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AccountHomePageComponent,
		AccountContainerComponent,
		AccountLayoutComponent,
		AccountMessagesPageComponent,
		AccountActivitiesPageComponent,
		AccountFavoritesPageComponent,
		AccountFavoritesPageComponent,
		AccountSettingsPageComponent,
		AccountActivitiesPageComponent,
		AccountSettingsPasswordPageComponent,
		AccountSettingsPersonalInfosPageComponent,
		AccountSettingsContactPageComponent,
		AccountSettingsDescriptionPageComponent,
		AccountSettingsInterestsPageComponent,
		AccountSettingsAddressPageComponent,
	],
	imports: [CommonModule, AccountRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class AccountModule {}
