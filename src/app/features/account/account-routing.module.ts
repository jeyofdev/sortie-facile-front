import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@routes/account.route';

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule {}
