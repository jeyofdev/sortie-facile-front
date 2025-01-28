import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '@root/core/routes/root.route';

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
