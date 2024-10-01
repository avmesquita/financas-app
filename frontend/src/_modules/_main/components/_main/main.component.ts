import { AfterViewInit, Component } from '@angular/core';
import { PrimeNGConfig, Translation } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

/**
 * Principal Componente do Softare
 */
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  constructor(private config: PrimeNGConfig, 
              private translateService: TranslateService, 
              public router: Router,
              private swUpdate: SwUpdate) {

    if ('caches' in window) {
      caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                return caches.delete(key);
            }));
        });
    }                
    
    if (this.swUpdate.isEnabled) {      
      this.swUpdate.versionUpdates.subscribe( (event: any) => {
        if (event.type === "VERSION_READY") {
          if (!environment.production)
            console.log('PWA: Version is ready');
          window.location.reload();
        }
        if (event.type === "NO_NEW_VERSION_DETECTED") {
          if (!environment.production)
            console.log('PWA: Nothing to update');
        }
        if (event.type === "VERSION_DETECTED") {
          if (!environment.production)   
            console.log('PWA: App has new version');
        }
        if (event.type === "VERSION_INSTALLATION_FAILED") {
          if (!environment.production)
            console.log("PWA: Failure on version update", event.version.appData);
        }        
      });
      this.swUpdate.checkForUpdate().then((thereis: boolean) => {
        if (thereis) {
          this.swUpdate.activateUpdate()
            .then( () => window.location.reload())
            .catch( (error) => console.error('PWA: Failed to apply new version updates: ', error));
        }
      }).catch((error) => {
        console.error('PWA: Could not check for app updates', error);
      });  
    } else return;    
  }
  ngAfterViewInit(): void {
    //window.location.reload();
    /*
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (const registration of registrations) {
          // unregister service worker
          console.log('serviceWorker unregistered');
          registration.unregister();
        }
      });
    }*/  
  }

  /**
   * Parametros de Inicialização
   */
  ngOnInit() {
      this.config.ripple = true;
      this.translateService.setDefaultLang('en');
  }

  /**
   * Função de Tradução
   * @param lang 
   */
  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe((res: Translation) => this.config.setTranslation(res));
  }
}
