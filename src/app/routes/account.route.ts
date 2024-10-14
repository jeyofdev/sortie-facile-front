import { Routes } from '@angular/router';
import { AccountHomeComponent } from '@features/account/pages/account-home/account-home.component';
import { userGuard } from '@guards/user.guard';
import { AccountEnum } from '@shared/enums/routes.enum';

export const routes: Routes = [
	{
		path: AccountEnum.HOME,
		component: AccountHomeComponent,
		canActivate: [userGuard],
	},
];
