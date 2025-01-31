import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { SharedModule } from '@shared/shared.module';
import { InterestComponent } from './pages/interest/interest.component';
import { ActivityLayoutComponent } from './components/activity-layout/activity-layout.component';

@NgModule({
	declarations: [ActivitiesComponent, InterestComponent, ActivityLayoutComponent],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
