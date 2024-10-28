import { Routes } from '@angular/router';
import { userGuard } from '@guards/user.guard';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountSettingsPageComponent } from '@root/features/account/pages/account-settings/account-settings-page/account-settings-page.component';
import { AccountRouteEnum, ActivityRouteEnum, SettingsRouteEnum } from '@shared/enums/routes.enum';
import { AccountHomePageComponent } from '@root/features/account/pages/account-home-page/account-home-page.component';
import { AccountSettingsPersonalInfosPageComponent } from '@root/features/account/pages/account-settings/account-settings-personal-infos-page/account-settings-personal-infos-page.component';
import { AccountSettingsDescriptionPageComponent } from '@root/features/account/pages/account-settings/account-settings-description-page/account-settings-description-page.component';
import { AccountSettingsContactPageComponent } from '@root/features/account/pages/account-settings/account-settings-contact-page/account-settings-contact-page.component';
import { AccountSettingsInterestsPageComponent } from '@root/features/account/pages/account-settings/account-settings-interests-page/account-settings-interests-page.component';
import { AccountSettingsPasswordPageComponent } from '@root/features/account/pages/account-settings/account-settings-password-page/account-settings-password-page.component';
import { profileResolver } from '@root/core/resolvers/profile.resolver';
import { AccountCreateActivityPageComponent } from '@root/features/account/pages/account-activities/account-create-activity-page/account-create-activity-page.component';
import { AccountActivityHomePageComponent } from '@root/features/account/pages/account-activities/account-activity-home-page/account-activity-home-page.component';

export const routes: Routes = [
	{
		path: AccountRouteEnum.HOME,
		component: AccountHomePageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountRouteEnum.FAVORITES,
		component: AccountFavoritesPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountRouteEnum.ACTIVITIES,
		component: AccountActivityHomePageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountRouteEnum.ACTIVITIES + '/' + ActivityRouteEnum.CREATE,
		component: AccountCreateActivityPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountRouteEnum.MESSAGES,
		component: AccountMessagesPageComponent,
		canActivate: [userGuard],
	},
	{
		path: AccountRouteEnum.SETTINGS,
		component: AccountSettingsPageComponent,
		canActivate: [userGuard],
		resolve: {
			profile: profileResolver,
		},
		children: [
			{
				path: SettingsRouteEnum.PROFILE,
				component: AccountSettingsPersonalInfosPageComponent,
			},
			{
				path: SettingsRouteEnum.PASSWORD,
				component: AccountSettingsPasswordPageComponent,
			},
			{
				path: SettingsRouteEnum.CONTACT,
				component: AccountSettingsContactPageComponent,
			},
			{
				path: SettingsRouteEnum.DESCRIPTION,
				component: AccountSettingsDescriptionPageComponent,
			},
			{
				path: SettingsRouteEnum.INTERESTS,
				component: AccountSettingsInterestsPageComponent,
			},
		],
	},
];
