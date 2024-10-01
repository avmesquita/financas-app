import {
  Component,
  OnInit,
  Output,
  EventEmitter  
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';
import { funcao } from '../../enums/funcao';
import { ScreenService } from '../../services/screen.service';

/**
 * Componente de Login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  /**
   * Constructor / Injeção de Dependência
   * 
   * @param fb 
   * @param authenticationService 
   * @param messageService 
   */
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    public screenService: ScreenService
  ) {}

  @Output() emitToAlteraModo: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup = this.fb.group({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  loading: any;

  funcao = funcao;

  /**
   * Alterar Modo
   * 
   * @param modo 
   */
  irParaModo(modo: number) {
    this.emitToAlteraModo.emit(modo);
  }

  /**
   * Submeter formulário
   * 
   * @returns 
   */
  entrar() {
    this.loading = true;

    var email = this.loginForm?.controls['username'].value;
    var senha = this.loginForm?.controls['password'].value;

    if (!email || email.length === 0 || !senha || senha.length === 0) {
      //this.showLoginError();
      return;
    }

    this.authenticationService
      .autenticarUtilizador(email, senha)
      .subscribe((success: boolean) => {
        if (success) {
          //TODO: Fechar
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Autenticado com sucesso!'            
          });
          window.location.href = window.location.href;
        } else {
          //this.showLoginError();
          //TODO: Fechar
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao Autenticar'            
          });
        }
      });
  }
}
