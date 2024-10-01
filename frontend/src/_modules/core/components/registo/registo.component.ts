import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { funcao } from '../../enums/funcao';
import { UtilizadorService } from '../../services/utilizador.service';
import { Utilizador } from '../../models/utilizador.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ScreenService } from '../../services/screen.service';

/**
 * Componente de Registo no Sistema
 */
@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegistoComponent {
  display = true;
  loading = false;

  registoForm: FormGroup;/* = this.fb.group({
    username: new FormControl(""),
    password: new FormControl(""),
    name: new FormControl(""),
  });*/

  funcao = funcao;

  /**
   * Constructor
   * 
   * @param fb 
   * @param userService 
   * @param messageService 
   * @param router 
   */
  constructor(private fb: FormBuilder,
              private userService: UtilizadorService,
              private messageService: MessageService,
              private router: Router,
              public screenService: ScreenService) {
    this.registoForm = this.fb.group({
      username: new FormControl(""),
      password: new FormControl(""),
      name: new FormControl(""),
    });              
  }

  @Output() emitToAlteraModo: EventEmitter<any> = new EventEmitter();

  /**
   * Alterar o Modo
   * 
   * @param modo 
   */  
  irParaModo(modo: number) {
    this.emitToAlteraModo.emit(modo);
  }

  /**
   * Submeter formulário de registo
   * 
   * @returns 
   */
  registar() {
    this.loading = true;

    const email = this.registoForm?.controls['username'].value;
    const senha = this.registoForm?.controls['password'].value;
    const nome = this.registoForm?.controls['name'].value;

    if (!email || email.length === 0 || !senha || senha.length === 0) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Senha inválida',
        detail: 'Registo',
      });
      return;
    }

    const user = new Utilizador();
    user.nome = nome;
    user.email = email;
    user.senha = senha;
    this.userService
      .create(user)
      .subscribe((success: boolean) => {
        if (success) {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Registado'
          });
          this.router.navigate(['/aplicativo/contas']);
          //window.location.href = window.location.href;
        } else {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro na Criação de Conta de Utilizador',            
          });
        }
      });
  } 
}
