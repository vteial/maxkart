import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

environment.mode = 'prod';
// environment.baseApiPrefix = 'https://api.paymence.com/api';
if (window.location.hostname.indexOf('staging') > -1) {
  environment.mode = 'staging';
  // environment.baseApiPrefix = 'https://api-staging.paymence.com/api';
}
if (window.location.hostname.indexOf('localhost') > -1) {
  environment.mode = 'dev';
  // environment.baseApiPrefix = 'https://api-staging.paymence.com/api';
}
const usp = new URLSearchParams(document.location.search);
if (usp.has('mode')) {
  const mode = usp.get('mode');
  if (mode === 'prod') {
    environment.mode = 'prod';
    // environment.baseApiPrefix = 'https://api.paymence.com/api';
  }
  if (mode === 'staging') {
    environment.mode = 'staging';
    // environment.baseApiPrefix = 'https://api-staging.paymence.com/api';
  }
  if (mode === 'dev') {
    environment.mode = 'dev';
    // environment.baseApiPrefix = 'https://api-staging.paymence.com/api';
  }
}
// environment.baseApiPrefix = 'https://api.paymence.com/api';
console.log('EnvMode : ' + environment.mode);
console.log('Backend : ' + environment.baseApiPrefix);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
