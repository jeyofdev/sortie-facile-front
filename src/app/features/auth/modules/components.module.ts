import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../component/layout/auth-layout/auth-layout.component';
import { AuthProfileLayoutComponent } from '../component/layout/auth-profile-layout/auth-profile-layout.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [AuthLayoutComponent, AuthProfileLayoutComponent],
	imports: [CommonModule, SharedModule],
	exports: [AuthLayoutComponent, AuthProfileLayoutComponent],
})
export class ComponentsModule {}
