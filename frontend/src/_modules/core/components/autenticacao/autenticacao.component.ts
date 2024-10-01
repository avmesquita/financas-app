import { ChangeDetectionStrategy, Component } from '@angular/core';
import { funcao } from '../../enums/funcao';
import { AuthenticationService } from '../../services/authentication.service';
import { Utilizador } from '../../models/utilizador.model';
import { Router } from '@angular/router';

/**
 * Componente de Autenticação
 */
@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AutenticacaoComponent { 

  /**
   * De acordo com funcao, é exibido o componente adequado para a operação
   */
  public display: funcao = funcao.login;

  /**
   * Obtem a função actual
   */
  public get funcao(){
    return funcao
  }

  /**
   * Constructor
   * 
   * @param {AuthenticationService} authService Serviço de Autenticaçºao
   * @param {Router} router Serviço de Rotas
   */
  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.authService.currentUser?.subscribe( (user: Utilizador) => {
      if (user) {
        this.router.navigate(['/aplicativo/contas']);
      }      
    })
  }

  /**
   * Alterar modo de autenticação
   * 
   * @param {number} modo modo de autenticação
   */
  alteraModo(modo:number) {
    switch (modo) {
      case funcao.login:
        this.display = funcao.login
        break;
      case funcao.registo:
        this.display = funcao.registo
        break;
      case funcao.recuperar:
        this.display = funcao.recuperar
        break;
    }
  }

}
