import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'buscar-lugares',
        loadChildren: () => import('./../pages/buscar-lugares/buscar-lugares.module').then( m => m.BuscarLugaresPageModule)
      },
      {
        path: 'lista-lugares',
        loadChildren: () => import('./../pages/lista-lugares/lista-lugares.module').then( m => m.ListaLugaresPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/buscar-lugares',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/buscar-lugares',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
