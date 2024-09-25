import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@root/app-routing.module';
import { AppComponent } from '@root/app.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
