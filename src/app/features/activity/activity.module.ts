import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { SharedModule } from '@shared/shared.module';
import { InterestComponent } from './pages/interest/interest.component';

@NgModule({
	declarations: [ActivitiesComponent, InterestComponent],
	imports: [CommonModule, ActivityRoutingModule, SharedModule],
})
export class ActivityModule {}
