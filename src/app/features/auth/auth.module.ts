import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [SigninPageComponent],
	imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
