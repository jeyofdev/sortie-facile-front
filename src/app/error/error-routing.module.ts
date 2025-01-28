import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@root/core/routes/error.route';

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule {}
