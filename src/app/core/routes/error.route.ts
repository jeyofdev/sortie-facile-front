import { Routes } from '@angular/router';
import { ErrorRouteEnum } from '@shared/enums/routes.enum';
import { NotFoundPageComponent } from '@root/error/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
	{
		path: ErrorRouteEnum.NOT_FOUND,
		component: NotFoundPageComponent,
	},
];
