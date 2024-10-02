import { Routes } from '@angular/router';
import { PersonalPageComponent } from '@auth/modules/profile/pages/personal-page/personal-page.component';
import { AddressPageComponent } from '@features/auth/modules/profile/pages/address-page/address-page.component';
import { AuthProfileEnum } from '@shared/enums/routes.enum';

export const routes: Routes = [
	{
		path: AuthProfileEnum.PERSONAL,
		component: PersonalPageComponent,
	},
	{
		path: AuthProfileEnum.ADDRESS,
		component: AddressPageComponent,
	},
];
