import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NlfModule } from './app/nlf.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // Remove all console.logs
  if (window) {
    window.console.log = function () { };
  }
}


platformBrowserDynamic().bootstrapModule(NlfModule)
  .catch(err => console.log(err));
