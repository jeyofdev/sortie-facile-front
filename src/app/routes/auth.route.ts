import { Routes } from '@angular/router';
import { AuthRouteEnum } from '@enums/routes.enum';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';

export const routes: Routes = [
	{
		path: AuthRouteEnum.SIGNIN,
		component: SigninPageComponent,
	},
];
