import { Injectable } from '@angular/core';

/**
 * Serviço de controle de sessão
 **/
@Injectable({
  providedIn: 'root'
})
export class SessionService {

      /**
     * set session storage item
     * @param key
     * @param value
     */
       setItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * get session storage item
     * @param key
     */
    getItem(key: string): any {
        var value = sessionStorage.getItem(key);        
        if (value !== null)
          return JSON.parse(value);
        else
          return null;
    }

    /**
     * remove session storage item
     * @param key
     */
    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        sessionStorage.clear();
    }
    
}
