import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@root/app.module';

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));
