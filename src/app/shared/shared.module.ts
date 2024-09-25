import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { PrimengModule } from './modules/primeng.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, PrimengModule],
  exports: [ButtonComponent, PrimengModule],
})
export class SharedModule {}
