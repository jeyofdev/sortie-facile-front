import { NgModule } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { PrimengModule } from './primeng.module';

@NgModule({
	declarations: [HeaderComponent],
	imports: [PrimengModule],
	exports: [HeaderComponent],
})
export class ComponentModule {}
