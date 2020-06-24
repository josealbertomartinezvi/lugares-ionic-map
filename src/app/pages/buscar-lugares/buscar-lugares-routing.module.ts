import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarLugaresPage } from './buscar-lugares.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarLugaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarLugaresPageRoutingModule {}
