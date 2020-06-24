import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaLugaresPageRoutingModule } from './lista-lugares-routing.module';

import { ListaLugaresPage } from './lista-lugares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaLugaresPageRoutingModule
  ],
  declarations: [ListaLugaresPage]
})
export class ListaLugaresPageModule {}
