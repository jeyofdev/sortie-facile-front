import { Routes } from '@angular/router';
import { PrimaryRouteEnum } from '@enums/routes.enum';
import { HomePageComponent } from '@landing/pages/home-page/home-page.component';
import { NotFoundPageComponent } from '@error/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
	{
		path: PrimaryRouteEnum.HOME,
		pathMatch: 'full',
		component: HomePageComponent,
	},
	{
		path: PrimaryRouteEnum.AUTH,
		loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: PrimaryRouteEnum.ACCOUNT,
		loadChildren: () => import('@features/account/account.module').then(m => m.AccountModule),
	},
	{
		path: PrimaryRouteEnum.NOT_FOUND,
		pathMatch: 'full',
		component: NotFoundPageComponent,
	},
];
