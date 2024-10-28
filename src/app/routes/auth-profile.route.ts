import { Routes } from '@angular/router';
import { PersonalPageComponent } from '@auth/modules/profile/pages/personal-page/personal-page.component';
import { AddressPageComponent } from '@features/auth/modules/profile/pages/address-page/address-page.component';
import { ContactPageComponent } from '@root/features/auth/modules/profile/pages/contact-page/contact-page.component';
import { DescriptionPageComponent } from '@root/features/auth/modules/profile/pages/description-page/description-page.component';
import { InterestsPageComponent } from '@root/features/auth/modules/profile/pages/interests-page/interests-page.component';
import { AuthProfileRouteEnum } from '@shared/enums/routes.enum';

export const routes: Routes = [
	{
		path: AuthProfileRouteEnum.PERSONAL,
		component: PersonalPageComponent,
	},
	{
		path: AuthProfileRouteEnum.ADDRESS,
		component: AddressPageComponent,
	},
	{
		path: AuthProfileRouteEnum.CONTACT,
		component: ContactPageComponent,
	},
	{
		path: AuthProfileRouteEnum.DESCRIPTION,
		component: DescriptionPageComponent,
	},
	{
		path: AuthProfileRouteEnum.INTERESTS,
		component: InterestsPageComponent,
	},
];
