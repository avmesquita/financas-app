import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Utilizador } from '../../models/utilizador.model';
import { AuthenticationService } from '../../services/authentication.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Componente de Menu de Opções
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: MenuItem[] = [];

  currentUser?: Utilizador;
  displayLogin = false;

  /**
   * Constructor / Injeção de Dependência
   * 
   * 
   *    
   * @param authService 
   */
  constructor(private authService: AuthenticationService) {    
    this.loadMenu();
  }

  /**
   * Show Login
   */
  showLogin() {
    this.displayLogin = true;
  }

  /**
   * Load Menu Item(s)
   */
  loadMenu() {    
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      //this.authService.currentUser?.subscribe( (user: Utilizador) => {      
        try {
          if (user.id !== '') {
            this.items = [];
            this.items.push(
              { 
                label: ' CONTAS',
                icon: 'pi pi-list-check',
                routerLink: '/aplicativo/contas'            
              },
              {
                  label: 'LANÇAMENTOS',
                  icon: 'pi pi-credit-card',
                  routerLink: '/aplicativo/lancamentos'
              },
              {
                label: ' SAIR',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.authService.logout();                  
                }
              }
            );            
          } else {
            this.items = [];
            this.items.push(
              {
                label: 'ENTRAR',
                icon: 'pi pi-sign-in',
                routerLink: '/aplicativo/entrar'
              }      
            );            
          }           
  
        } catch (error) {
          this.items = [];
          this.items.push(
            {
              label: 'ENTRAR',
              icon: 'pi pi-sign-in',
              routerLink: '/aplicativo/entrar'
            }      
          );          
        }
    } else {
      this.items = [];
      this.items.push(
        {
          label: 'ENTRAR',
          icon: 'pi pi-sign-in',
          routerLink: '/aplicativo/entrar'
        }      
      );      
    }
  }
  
    
    
  
}
