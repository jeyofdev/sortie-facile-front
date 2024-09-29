import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from '@shared/modules/primeng.module';
import { ButtonHeaderIconComponent } from '@shared/components/buttons/button-header-icon/button-header-icon.component';
import { InputSearchComponent } from '@shared/components/form/input/input-search/input-search.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { LayoutComponent } from '@shared/components/layout/layout/layout.component';
import { ErrorFieldComponent } from '@shared/components/form/error-field/error-field.component';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '@shared/components/form/text-field/text-field.component';

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
	],
	imports: [CommonModule, PrimengModule],
	exports: [
		HeaderComponent,
		FooterComponent,
		ContainerComponent,
		LayoutComponent,
		ErrorFieldComponent,
		TextFieldComponent,
	],
})
export class ComponentModule {}
