import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ComponentsModule } from '@features/auth/modules/components.module';

@NgModule({
	declarations: [SigninPageComponent, SignupPageComponent],
	imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, ComponentsModule],
})
export class AuthModule {}
