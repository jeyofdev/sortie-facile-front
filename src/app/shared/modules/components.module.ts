import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from '@shared/modules/primeng.module';
import { ButtonHeaderIconComponent } from '@shared/components/buttons/button-header-icon/button-header-icon.component';
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { LayoutComponent } from '@shared/components/layout/layout/layout.component';
import { ErrorFieldComponent } from '@shared/components/form/error-field/error-field.component';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';
import { PasswordFieldComponent } from '@shared/components/form/password-field/password-field.component';
import { AlertErrorComponent } from '@shared/components/form/alert-error/alert-error.component';
import { MaskFieldComponent } from '@shared/components/form/mask-field/mask-field.component';
import { NumberFieldComponent } from '@shared/components/form/number-field/number-field.component';
import { SelectFieldComponent } from '@shared/components/form/select-field/select-field.component';
import { AutocompleteFieldComponent } from '@shared/components/form/autocomplete-field/autocomplete-field.component';

@NgModule({
	declarations: [
		HeaderComponent,
		ButtonHeaderIconComponent,
		InputSearchComponent,
		LogoComponent,
		FooterComponent,
		ContainerComponent,
		LayoutComponent,
		ErrorFieldComponent,
		TextFieldComponent,
		PasswordFieldComponent,
		AlertErrorComponent,
		MaskFieldComponent,
		NumberFieldComponent,
		SelectFieldComponent,
		AutocompleteFieldComponent,
	],
	imports: [CommonModule, PrimengModule],
	exports: [
		HeaderComponent,
		FooterComponent,
		ContainerComponent,
		LayoutComponent,
		ErrorFieldComponent,
		TextFieldComponent,
		PasswordFieldComponent,
		AlertErrorComponent,
		MaskFieldComponent,
		NumberFieldComponent,
		SelectFieldComponent,
		AutocompleteFieldComponent,
	],
})
export class ComponentModule {}
