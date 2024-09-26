import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from './primeng.module';
import { ButtonHeaderIconComponent } from '@shared/components/buttons/button-header-icon/button-header-icon.component';
import { InputSearchComponent } from '@shared/components/form/input/input-search/input-search.component';

@NgModule({
	declarations: [HeaderComponent, ButtonHeaderIconComponent, InputSearchComponent],
	imports: [PrimengModule],
	exports: [HeaderComponent],
})
export class ComponentModule {}
