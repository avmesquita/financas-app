import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { funcao } from '../../enums/funcao';
import { ScreenService } from '../../services/screen.service';

/**
 * Componente de Recuperação de Conta
 */
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RecuperarComponent {
  display = true;
  loading = false;

  recoverForm: FormGroup = this.fb.group({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  funcao = funcao;

  constructor(private fb: FormBuilder,
              public screenService: ScreenService) {}

  @Output() emitToAlteraModo: EventEmitter<any> = new EventEmitter();

  /**
   * Alterar o Modo
   * @param modo 
   */
  irParaModo(modo: number) {
    this.emitToAlteraModo.emit(modo);
  }

  /**
   * Submeter formulário de recuperação de conta
   */
  recuperar() {

  }

}
