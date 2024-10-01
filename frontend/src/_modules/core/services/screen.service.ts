import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Serviço de Tela
 */
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

    /**
     * A tela está em modo compacto para telemóveis?
     */
    public isMobile: boolean = window.innerWidth < 600;

    /**
     * A tela está em modo compacto para tablet?
     */
    public isTablet: boolean = window.innerWidth < 800;

    /**
     * Largura da Tela
     */
    private innerWidth: number = window.innerWidth;

    /**
     * Altura da Tela
     */
    private innerHeight: number = window.innerHeight;
    
    /**
     * Nota de desenvolvimento
     */
    constructor() {
        if (!environment.production) {
          console.log('isMobile => ', this.isMobile, ' (', this.innerWidth, ' x ', this.innerHeight, ')');
        }        
    }    
}
