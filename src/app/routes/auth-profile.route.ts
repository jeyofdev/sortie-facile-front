import { Routes } from '@angular/router';
import { PersonalPageComponent } from '@auth/modules/profile/pages/personal-page/personal-page.component';
import { AddressPageComponent } from '@features/auth/modules/profile/pages/address-page/address-page.component';
import { ContactPageComponent } from '@root/features/auth/modules/profile/pages/contact-page/contact-page.component';
import { DescriptionPageComponent } from '@root/features/auth/modules/profile/pages/description-page/description-page.component';
import { InterestsPageComponent } from '@root/features/auth/modules/profile/pages/interests-page/interests-page.component';
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
	{
		path: AuthProfileEnum.CONTACT,
		component: ContactPageComponent,
	},
	{
		path: AuthProfileEnum.DESCRIPTION,
		component: DescriptionPageComponent,
	},
	{
		path: AuthProfileEnum.INTERESTS,
		component: InterestsPageComponent,
	},
];
