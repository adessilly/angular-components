import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { Angular2ComponentsTestModule } from './app/main/angular2-components-test.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Angular2ComponentsTestModule);
