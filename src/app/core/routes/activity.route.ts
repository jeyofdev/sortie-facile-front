import { Routes } from '@angular/router';
import { ActivitiesComponent } from '@root/features/activity/pages/activities/activities.component';
import { InterestComponent } from '@root/features/activity/pages/interest/interest.component';

export const routes: Routes = [
	{
		path: '',
		component: ActivitiesComponent,
	},
	{
		path: ':interest',
		component: InterestComponent,
	},
];
