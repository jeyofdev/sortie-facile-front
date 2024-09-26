import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from '@shared/modules/primeng.module';
import { ButtonHeaderIconComponent } from '@shared/components/buttons/button-header-icon/button-header-icon.component';
import { InputSearchComponent } from '@shared/components/form/input/input-search/input-search.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { LayoutComponent } from '@shared/components/layout/layout/layout.component';

@NgModule({
	declarations: [
		HeaderComponent,
		ButtonHeaderIconComponent,
		InputSearchComponent,
		LogoComponent,
		FooterComponent,
		ContainerComponent,
		LayoutComponent,
	],
	imports: [PrimengModule],
	exports: [HeaderComponent, FooterComponent, ContainerComponent, LayoutComponent],
})
export class ComponentModule {}
