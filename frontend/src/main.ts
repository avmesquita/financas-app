import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './_modules/_main/main.module';

if (!isDevMode()) {
  enableProdMode();
}

/**
 * Função inicial do aplicativo
 */
platformBrowserDynamic().bootstrapModule(MainModule)
  .catch( 
    (err: any) => console.error(err)
  );
