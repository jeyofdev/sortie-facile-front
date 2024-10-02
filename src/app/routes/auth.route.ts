import { Routes } from '@angular/router';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@enums/routes.enum';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { SignupPageComponent } from '@root/features/auth/pages/signup-page/signup-page.component';

export const routes: Routes = [
	{
		path: AuthRouteEnum.SIGNIN,
		component: SigninPageComponent,
	},
	{
		path: AuthRouteEnum.SIGNUP,
		component: SignupPageComponent,
	},
	{
		path: AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE,
		loadChildren: () => import('@auth/modules/profile/profile.module').then(m => m.ProfileModule),
	},
];
