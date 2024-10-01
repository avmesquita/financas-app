import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModoDeEdicaoFormulario } from 'src/_modules/core/enums/modo-de-edicao-formulario';
import { IConta } from '../../interfaces/iconta.interface';
import { Conta } from '../../models/conta.model';
import { ContaService } from '../../services/conta.service';

/**
 * Componente de Detalhe de Conta
 */
@Component({
  selector: 'app-conta-detalhe',
  templateUrl: './conta-detalhe.component.html',
  styleUrls: ['./conta-detalhe.component.scss']
})
export class ContaDetalheComponent implements OnInit {

  id: string = "";
  modo: ModoDeEdicaoFormulario = ModoDeEdicaoFormulario.Nenhum;
  private conta: IConta = new Conta();

  data = Date.now;
  ModoExterno = ModoDeEdicaoFormulario;

  formConta: FormGroup = this.transformarForm(this.conta);

  /**
   * Constructor / Injeção de Dependência
   * 
   * @param {FormBuilder} fb 
   * @param {DynamicDialogRef} ref 
   * @param {DynamicDialogConfig} config 
   * @param {AplicativoService} applicativoService 
   * @param {MessageService} messageService 
   * @param {ContaService} contaService 
   */
  constructor(private fb: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private contaService: ContaService) {
  }

  /**
   * Função OnInit
   */
  ngOnInit(): void {
    this.configurarFormulario()
  }

  /**
   * Configurar formulário de acordo com o Modo
   */
  configurarFormulario(): void {    
    this.id = this.config.data?.id;
    this.modo = this.config.data?.modo;

    switch(this.modo) {
      case ModoDeEdicaoFormulario.Editar:
      case ModoDeEdicaoFormulario.Excluir:
      case ModoDeEdicaoFormulario.Consultar: {
        this.contaService.getById(this.id).subscribe(
          (retorno: any) => {            
            if (retorno.success) {    
              this.conta = retorno.data;            
              this.formConta = this.transformarForm(this.conta);
            }
          }
        );
        break;
      }
      case ModoDeEdicaoFormulario.Incluir: {
        this.conta = new Conta();        
        const id = sessionStorage.getItem('id');
        if (id) {
          this.conta.userId = Number.parseInt(id);
        }        
        this.formConta = this.transformarForm(this.conta);
        break;
      }
      default: {
        break;
      }
    }

    if(this.modo == ModoDeEdicaoFormulario.Consultar || this.modo == ModoDeEdicaoFormulario.Excluir)
      this.formConta.disable();
  }

  /**
   * Transforma o DTO de Lançamento em Dados do Formulário
   * 
   * @param {IConta} conta
   * @returns {FormGroup}
   */
  transformarForm(conta: IConta): FormGroup {        
    const formConta = this.fb.group({
      id: new FormControl( conta.id ),
      uuid: new FormControl( conta.uuid ),
      nome: new FormControl( conta.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      descricao: new FormControl( conta.descricao, [Validators.maxLength(1000)]),
      saldoCredito: new FormControl( conta.saldoCredito ),
      saldoDebito: new FormControl( conta.saldoDebito ),      
      saldoConsolidado: new FormControl( conta.saldoConsolidado ),
      userId: new FormControl( conta.userId ),
      active: new FormControl( conta.active ),
      lancamentos: new FormControl( )//conta.lancamentos )      
    });

    return formConta;
  }

  /**
   * Obtém o DTO a partir do formulário preenchido
   * 
   * @returns {IConta}
   */
  criarContaParaSubmeter(): IConta {    
    const conta = new Conta();        

    conta.id = this.formConta.controls.id.value,
    conta.uuid = this.formConta.controls.uuid.value,
    conta.nome = this.formConta.controls.nome.value;
    conta.descricao = this.formConta.controls.descricao.value;
    //conta.lancamentos = this.formConta.controls.lancamentos.value;

    return conta;
  }

  /**
   * Submeter Formulário
   */
  submitConta(){
    switch(this.modo) {
      case ModoDeEdicaoFormulario.Consultar: {
        this.ref.close();
        break;
      }
      case ModoDeEdicaoFormulario.Incluir: {        
        this.conta = this.criarContaParaSubmeter();

        this.contaService
        .create(this.conta)
        .subscribe((retorno: any) => {
          this.ref.close(retorno.body);          
        });
        
        break;
      }
      case ModoDeEdicaoFormulario.Editar: {        
        this.conta = this.criarContaParaSubmeter();
        this.contaService.update(this.conta).subscribe(
          (retorno: any) => {
            debugger;
            this.ref.close(retorno);
          }
        );        
        break;
      }
      case ModoDeEdicaoFormulario.Excluir: {        
        this.conta = this.criarContaParaSubmeter();
        this.contaService.delete(this.conta).subscribe(
          (retorno: any) => {            
            this.ref.close(retorno.body);            
          }
        );
        this.ref.close();
        break;
      }
      case ModoDeEdicaoFormulario.Nenhum: {
        this.ref.close();
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * Fechar Modal
   */
  fechar(): void {
    this.ref.close();
  }
  
}
