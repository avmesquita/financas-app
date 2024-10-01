import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './components/contas/contas.component';
import { LancamentosComponent } from './components/lancamentos/lancamentos.component';
import { EntrarComponent } from './components/entrar/entrar.component';


const routes: Routes = [
  {
    path: 'entrar',
    title: 'Finanças App :: Entrar',
    component: EntrarComponent
  },
  {
    path: 'lancamentos',
    title: 'Finanças App :: Lançamentos',
    component: LancamentosComponent
  },
  {
    path: 'contas',
    title: 'Finanças App :: Contas',
    component: ContasComponent
  },
];

/**
 * Módulo de Roteamento do Aplicativo
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicativoRoutingModule { }
