import { Routes } from '@angular/router';
import { userGuard } from '@guards/user.guard';
import { AccountActivitiesPageComponent } from '@features/account/pages/account-activities-page/account-activities-page.component';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountSettingsPageComponent } from '@root/features/account/pages/account-settings/account-settings-page/account-settings-page.component';
import { AccountEnum, SettingsEnum } from '@shared/enums/routes.enum';
import { AccountHomePageComponent } from '@root/features/account/pages/account-home-page/account-home-page.component';
import { AccountSettingsPersonalInfosPageComponent } from '@root/features/account/pages/account-settings/account-settings-personal-infos-page/account-settings-personal-infos-page.component';
import { AccountSettingsDescriptionPageComponent } from '@root/features/account/pages/account-settings/account-settings-description-page/account-settings-description-page.component';
import { AccountSettingsContactPageComponent } from '@root/features/account/pages/account-settings/account-settings-contact-page/account-settings-contact-page.component';
import { AccountSettingsAddressPageComponent } from '@root/features/account/pages/account-settings/account-settings-address-page/account-settings-address-page.component';
import { AccountSettingsInterestsPageComponent } from '@root/features/account/pages/account-settings/account-settings-interests-page/account-settings-interests-page.component';
import { AccountSettingsPasswordPageComponent } from '@root/features/account/pages/account-settings/account-settings-password-page/account-settings-password-page.component';

export const routes: Routes = [
	{
		path: AccountEnum.HOME,
		component: AccountHomePageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountEnum.FAVORITES,
		component: AccountFavoritesPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountEnum.ACTIVITIES,
		component: AccountActivitiesPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountEnum.MESSAGES,
		component: AccountMessagesPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountEnum.SETTINGS,
		component: AccountSettingsPageComponent,
		canActivate: [userGuard],
		children: [
			{
				path: SettingsEnum.PROFILE,
				component: AccountSettingsPersonalInfosPageComponent,
			},
			{
				path: SettingsEnum.PASSWORD,
				component: AccountSettingsPasswordPageComponent,
			},
			{
				path: SettingsEnum.CONTACT,
				component: AccountSettingsContactPageComponent,
			},
			{
				path: SettingsEnum.DESCRIPTION,
				component: AccountSettingsDescriptionPageComponent,
			},
			{
				path: SettingsEnum.INTERESTS,
				component: AccountSettingsInterestsPageComponent,
			},
		],
	},
];
