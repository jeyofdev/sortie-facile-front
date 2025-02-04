import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@root/core/routes/account.route';

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule {}
