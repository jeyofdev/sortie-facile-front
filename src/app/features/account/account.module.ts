import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@features/account/account-routing.module';
import { AccountHomePageComponent } from '@features/account/pages/account-home-page/account-home-page.component';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from '@root/features/account/components/ui/account-container/account-container.component';
import { AccountLayoutComponent } from '@root/features/account/components/ui/account-layout/account-layout.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountSettingsPageComponent } from '@features/account/pages/account-settings/account-settings-page/account-settings-page.component';
import { AccountActivitiesPageComponent } from '@features/account/pages/account-activities-page/account-activities-page.component';
import { AccountSettingsPasswordPageComponent } from './pages/account-settings/account-settings-password-page/account-settings-password-page.component';
import { AccountSettingsPersonalInfosPageComponent } from './pages/account-settings/account-settings-personal-infos-page/account-settings-personal-infos-page.component';
import { AccountSettingsContactPageComponent } from './pages/account-settings/account-settings-contact-page/account-settings-contact-page.component';
import { AccountSettingsDescriptionPageComponent } from './pages/account-settings/account-settings-description-page/account-settings-description-page.component';
import { AccountSettingsInterestsPageComponent } from './pages/account-settings/account-settings-interests-page/account-settings-interests-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsLayoutComponent } from './components/ui/account-settings-layout/account-settings-layout.component';
import { AccountSettingsContentElementComponent } from './components/ui/account-settings-content-element/account-settings-content-element.component';
import { AccountSettingsContentContainerComponent } from './components/ui/account-settings-content-container/account-settings-content-container.component';
import { SettingsContactFormComponent } from './components/smart/form/settings-contact-form/settings-contact-form.component';
import { SettingsDescriptionFormComponent } from './components/smart/form/settings-description-form/settings-description-form.component';
import { SettingsProfileFormComponent } from './components/smart/form/settings-profile-form/settings-profile-form.component';
import { SettingsAddressFormComponent } from './components/smart/form/settings-address-form/settings-address-form.component';
import { SettingsPasswordFormComponent } from './components/smart/form/settings-password-form/settings-password-form.component';

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
		AccountSettingsLayoutComponent,
		AccountSettingsContentElementComponent,
		AccountSettingsContentContainerComponent,
		SettingsContactFormComponent,
		SettingsDescriptionFormComponent,
		SettingsProfileFormComponent,
		SettingsAddressFormComponent,
		SettingsPasswordFormComponent,
	],
	imports: [CommonModule, AccountRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class AccountModule {}
