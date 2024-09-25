import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '@shared/modules/primeng.module';
import { ComponentModule } from '@shared/modules/components.module';

@NgModule({
	imports: [CommonModule, PrimengModule, ComponentModule],
	exports: [PrimengModule, ComponentModule],
})
export class SharedModule {}
