import { Routes } from '@angular/router';
import { AuthRouteEnum, PrimaryRouteEnum } from '@enums/routes.enum';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { SignupPageComponent } from '@root/features/auth/pages/signup-page/signup-page.component';
import { ForgotPasswordComponent } from '@root/features/auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@root/features/auth/pages/reset-password/reset-password.component';
import { CheckEmailComponent } from '@root/features/auth/pages/check-email/check-email.component';

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
		path: AuthRouteEnum.FORGOT_PASSWORD,
		component: ForgotPasswordComponent,
	},
	{
		path: AuthRouteEnum.RESET_PASSWORD,
		component: ResetPasswordComponent,
	},
	{
		path: AuthRouteEnum.CHECK_EMAIL,
		component: CheckEmailComponent,
	},
	{
		path: AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE,
		loadChildren: () => import('@auth/modules/profile/profile.module').then(m => m.ProfileModule),
	},
];
