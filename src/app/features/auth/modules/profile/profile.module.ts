import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '../components.module';
import { AddressPageComponent } from './pages/address-page/address-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { FormButtonBoxComponent } from './component/form-button-box/form-button-box.component';

@NgModule({
	declarations: [
		PersonalPageComponent,
		AddressPageComponent,
		ContactPageComponent,
		DescriptionPageComponent,
		FormButtonBoxComponent,
	],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ProfileRoutingModule, SharedModule, ComponentsModule],
})
export class ProfileModule {}
