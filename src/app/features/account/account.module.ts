import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountHomeComponent } from './pages/account-home/account-home.component';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';

@NgModule({
	declarations: [AccountHomeComponent, AccountContainerComponent, AccountLayoutComponent],
	imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
