import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente da Tela principal
 */
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {

  /**
   * Constructor
   * 
   * @param router 
   */
  constructor(private router: Router) { }

  /**
   * Muda rota para Entrar no Aplicativo ou página de contas
   */
  goToApplicativo(): void {    
    const token = sessionStorage.getItem('me');
    if (!token)
      this.router.navigate(['/aplicativo/entrar']);
    else
      this.router.navigate(['/aplicativo/contas']);
  }

}
