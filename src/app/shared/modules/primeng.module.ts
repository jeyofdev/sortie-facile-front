import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { BadgeModule } from 'primeng/badge';
import { MessagesModule } from 'primeng/messages';

@NgModule({
	exports: [
		ButtonModule,
		DialogModule,
		MenuModule,
		InputIconModule,
		IconFieldModule,
		InputTextModule,
		PasswordModule,
		BadgeModule,
		MessagesModule,
	],
})
export class PrimengModule {}
