import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaLugaresPage } from './lista-lugares.page';

const routes: Routes = [
  {
    path: '',
    component: ListaLugaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaLugaresPageRoutingModule {}
