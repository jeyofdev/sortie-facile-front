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
import { AlertErrorComponent } from '@shared/components/form/alert-form/alert-form.component';
import { MaskFieldComponent } from '@shared/components/form/mask-field/mask-field.component';
import { NumberFieldComponent } from '@shared/components/form/number-field/number-field.component';
import { SelectFieldComponent } from '@shared/components/form/select-field/select-field.component';
import { AutocompleteFieldComponent } from '@shared/components/form/autocomplete-field/autocomplete-field.component';
import { TextareaFieldComponent } from '@shared/components/form/textarea-field/textarea-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { ButtonImgComponent } from '@shared/components/buttons/button-img/button-img.component';
import { ActivityPreviewCardComponent } from '@shared/components/card/activity-preview-card/activity-preview-card.component';
import { TableActivityListComponent } from '@shared/components/table/table-activity-list/table-activity-list.component';

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
		TextareaFieldComponent,
		ToastComponent,
		ButtonImgComponent,
		ActivityPreviewCardComponent,
		TableActivityListComponent,
	],
	imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
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
		TextareaFieldComponent,
		ToastComponent,
		ButtonImgComponent,
		ActivityPreviewCardComponent,
		TableActivityListComponent,
	],
})
export class ComponentModule {}
