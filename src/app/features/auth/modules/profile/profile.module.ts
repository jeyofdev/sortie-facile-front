import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '../components.module';

@NgModule({
	declarations: [PersonalPageComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ProfileRoutingModule, SharedModule, ComponentsModule],
})
export class ProfileModule {}
