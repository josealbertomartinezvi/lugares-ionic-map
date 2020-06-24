import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarLugaresPageRoutingModule } from './buscar-lugares-routing.module';

import { BuscarLugaresPage } from './buscar-lugares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarLugaresPageRoutingModule
  ],
  declarations: [BuscarLugaresPage]
})
export class BuscarLugaresPageModule {}
