import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from '@auth/pages/signin-page/signin-page.component';
import { AuthRoutingModule } from '@auth/auth-routing.module';

@NgModule({
	declarations: [SigninPageComponent],
	imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
