import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-lugares',
  templateUrl: './lista-lugares.page.html',
  styleUrls: ['./lista-lugares.page.scss'],
})
export class ListaLugaresPage implements OnInit {

  public lugares: any = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getLugares();
  }

  getLugares(){
    this.storageService.getlugares()
    .then(lugares => {
      this.lugares = lugares;
    });
  }

}
