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
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';

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
		InputMaskModule,
		InputNumberModule,
		DropdownModule,
		AutoCompleteModule,
		InputTextareaModule,
		CheckboxModule,
	],
})
export class PrimengModule {}
