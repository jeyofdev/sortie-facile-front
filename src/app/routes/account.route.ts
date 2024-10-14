import { Routes } from '@angular/router';
import { userGuard } from '@guards/user.guard';
import { AccountActivitiesPageComponent } from '@features/account/pages/account-activities-page/account-activities-page.component';
import { AccountFavoritesPageComponent } from '@features/account/pages/account-favorites-page/account-favorites-page.component';
import { AccountMessagesPageComponent } from '@features/account/pages/account-messages-page/account-messages-page.component';
import { AccountSettingsPageComponent } from '@features/account/pages/account-settings-page/account-settings-page.component';
import { AccountEnum } from '@shared/enums/routes.enum';
import { AccountHomePageComponent } from '@root/features/account/pages/account-home-page/account-home-page.component';

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
	},
];
