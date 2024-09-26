import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from './primeng.module';
import { ButtonHeaderIconComponent } from '@shared/components/buttons/button-header-icon/button-header-icon.component';
import { InputSearchComponent } from '@shared/components/form/input/input-search/input-search.component';
import { LogoComponent } from '@shared/components/logo/logo.component';

@NgModule({
	declarations: [HeaderComponent, ButtonHeaderIconComponent, InputSearchComponent, LogoComponent],
	imports: [PrimengModule],
	exports: [HeaderComponent],
})
export class ComponentModule {}
