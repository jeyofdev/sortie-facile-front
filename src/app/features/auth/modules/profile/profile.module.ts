import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

@NgModule({
	declarations: [PersonalPageComponent],
	imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
