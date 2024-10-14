import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@features/account/account-routing.module';
import { AccountHomePageComponent } from '@root/features/account/pages/account-home-page/account-home-page.component';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from '@features/account/components/account-container/account-container.component';
import { AccountLayoutComponent } from '@features/account/components/account-layout/account-layout.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountSettingsPageComponent } from '@features/account/pages/account-settings-page/account-settings-page.component';
import { AccountActivitiesPageComponent } from '@features/account/pages/account-activities-page/account-activities-page.component';

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
	],
	imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
