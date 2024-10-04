import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from '../core/components/main-content/main-content.component';

const routes: Routes = [
  {
    path: "",    
    title: 'Finanças App',    
    component: MainContentComponent
  },
  {
    path: "aplicativo",
    title: 'Finanças App',
    loadChildren: () =>      
      import(
        /* webpackChunkName: "AplicativoModule" */
        "src/_modules/aplicativo/aplicativo.module"
      ).then((m) => m.AplicativoModule)
  },
  { path: '404', component: MainContentComponent },
  { path: '**', component: MainContentComponent },  
];

/**
 * Módulo principal de roteamento
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
