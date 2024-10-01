import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ILancamento } from '../../interfaces/ilancamento.interface';
import { Lancamento } from '../../models/lancamento.model';
import { AplicativoService } from '../../services/aplicativo.service';
import { ModoDeEdicaoFormulario } from 'src/_modules/core/enums/modo-de-edicao-formulario';
import { LancamentoService } from '../../services/lancamento.service';
import { IResponse } from 'src/_modules/core/interfaces/iresponse.interface';

/**
 * Componente de Detalhe de Lançamento
 */
@Component({
  selector: 'app-lancamento-detalhe',
  templateUrl: './lancamento-detalhe.component.html',
  styleUrls: ['./lancamento-detalhe.component.scss']
})
export class LancamentoDetalheComponent implements OnInit {

  id: string = "";
  modo: ModoDeEdicaoFormulario = ModoDeEdicaoFormulario.Nenhum;
  idConta: string = "";

  private lancamento: ILancamento = new Lancamento();

  selectedPerfil: string = ""
  data = Date.now;
  ModoExterno = ModoDeEdicaoFormulario;

  formLancamento: FormGroup = this.transformarForm(this.lancamento);

  msgs: Message[] = [];

  tiposDeLancamento = [
    {
      tipo: 'Debito',
      value: 'D'
    },
    {
      tipo: 'Credito',
      value: 'C'
    },
  ];

  locale: 'pt-BR';

  /**
   * Constructor / Injeção de Dependência
   * 
   * @param {FormBuilder} fb 
   * @param {DynamicDialogRef} ref 
   * @param {DynamicDialogConfig} config 
   * @param {AplicativoService} applicativoService 
   * @param {MessageService} messageService 
   * @param {LancamentoService} lancamentoService 
   */
  constructor(private fb: FormBuilder,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,                            
              private lancamentoService: LancamentoService) {

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
    this.idConta = this.config.data?.idConta;


    switch(this.modo) {
      case ModoDeEdicaoFormulario.Editar:
      case ModoDeEdicaoFormulario.Excluir:
      case ModoDeEdicaoFormulario.Consultar: {
        this.lancamentoService.getById(this.id).subscribe(
          (retorno: IResponse) => {
            debugger;
            if (retorno.success) {  
              this.lancamento = retorno.data;
              this.formLancamento = this.transformarForm(this.lancamento);                  
            }
          }
        )
        break;
      }
      case ModoDeEdicaoFormulario.Incluir: {
        this.lancamento = new Lancamento();
        this.lancamento.data = new Date();
        this.formLancamento = this.transformarForm(this.lancamento);
        break;
      }
      default: {
        console.log('ihhh! falha nossa!')
        break;
      }
    }

    if(this.modo == ModoDeEdicaoFormulario.Consultar || this.modo == ModoDeEdicaoFormulario.Excluir)
      this.formLancamento.disable()
  }

  /**
   * Transforma o DTO de Lançamento em Dados do Formulário
   * 
   * @param lancamento 
   * @returns 
   */
  transformarForm(lancamento: ILancamento): FormGroup {        
    const formLancamento = this.fb.group({
      id: new FormControl( lancamento.id ),
      uuid: new FormControl( lancamento.uuid ),
      titulo: new FormControl( lancamento.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      descricao: new FormControl( lancamento.descricao, [Validators.maxLength(100)]),
      dataLancamento: new FormControl( lancamento.data ),
      categorias: new FormControl( lancamento.categorias.toString() ),
      image: new FormControl( lancamento.image ),      
      tipoLancamento: new FormControl( lancamento.tipoLancamento ),
      valor: new FormControl( lancamento.valor, [Validators.required])
    });

    return formLancamento;
  }

  /**
   * Obtém o DTO a partir do formulário preenchido
   * 
   * @returns 
   */
  criarLancamentoParaSubmeter(): ILancamento {    
    const lancamento = new Lancamento();        

    if (this.modo !== ModoDeEdicaoFormulario.Incluir) {
      lancamento.id = this.formLancamento.controls.id.value;      
      lancamento.uuid = this.formLancamento.controls.uuid.value;
    }  

    lancamento.titulo = this.formLancamento.controls.titulo.value;
    lancamento.descricao = this.formLancamento.controls.descricao.value;
    lancamento.data = this.formLancamento.controls.dataLancamento.value;
    const categorias = this.formLancamento.controls.categorias.value;
    lancamento.categorias = categorias.toString();

    lancamento.image = this.formLancamento.controls.image.value;    
    lancamento.tipoLancamento = this.formLancamento.controls.tipoLancamento.value;
    lancamento.valor = this.formLancamento.controls.valor.value;
    
    lancamento.contaId = Number.parseInt(this.idConta);            

    if (lancamento.tipoLancamento == 'D') {
      if (lancamento.valor > 0) {
        lancamento.valor = lancamento.valor * -1;
      }      
    }

    return lancamento;
  }

  /**
   * Submeter Formulário
   */
  submitLancamento(){
    switch(this.modo) {
      case ModoDeEdicaoFormulario.Consultar: {
        this.ref.close();
        break;
      }
      case ModoDeEdicaoFormulario.Incluir: {
        this.lancamento = this.criarLancamentoParaSubmeter();        
        debugger;
        this.lancamentoService
        .create(this.lancamento).subscribe(
          (retorno: any) => {          
          if (retorno.body.success) {
            this.ref.close(retorno.body);
          }
        },(error: any) => {
          console.log('insert error', error);          
        });                
        break;
      }
      case ModoDeEdicaoFormulario.Editar: {        
        this.lancamento = this.criarLancamentoParaSubmeter();        
        debugger;
        this.lancamentoService
        .update(this.lancamento).subscribe( 
          (retorno: any) => {            
            if (retorno.body.success) {
              this.ref.close(retorno.body);
            }
        },(error: any) => {
          console.log('update error', error);          
        });
        break;
      }
      case ModoDeEdicaoFormulario.Excluir: {        
        this.lancamento = this.criarLancamentoParaSubmeter();
        debugger;
        this.lancamentoService
        .delete(this.lancamento).subscribe( (retorno: any) => {
          this.ref.close(retorno.body);                    
        });                
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
   * Fechar o Modal
   */
  fechar(): void {
    this.ref.close();
  }

}
