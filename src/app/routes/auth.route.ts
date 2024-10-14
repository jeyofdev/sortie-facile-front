import { Routes } from '@angular/router';
import { AuthRouteEnum, PrimaryRouteEnum } from '@enums/routes.enum';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { SignupPageComponent } from '@root/features/auth/pages/signup-page/signup-page.component';
import { ForgotPasswordComponent } from '@root/features/auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@root/features/auth/pages/reset-password/reset-password.component';
import { CheckEmailComponent } from '@root/features/auth/pages/check-email/check-email.component';
import { VerificationAccountPageComponent } from '@root/features/auth/pages/verification-account-page/verification-account-page.component';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
	{
		path: AuthRouteEnum.SIGNIN,
		component: SigninPageComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.SIGNUP,
		component: SignupPageComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.FORGOT_PASSWORD,
		component: ForgotPasswordComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.RESET_PASSWORD,
		component: ResetPasswordComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.CHECK_EMAIL,
		component: CheckEmailComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.VERIFICATION_ACCOUNT,
		component: VerificationAccountPageComponent,
		canActivate: [authGuard],
	},
	{
		path: AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE,
		loadChildren: () => import('@auth/modules/profile/profile.module').then(m => m.ProfileModule),
	},
];
