import { ApiService } from './../../services/api/api.service';
import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-lugares',
  templateUrl: './lista-lugares.page.html',
  styleUrls: ['./lista-lugares.page.scss'],
})
export class ListaLugaresPage implements OnInit {

  public lugares: any = [];

  /**
   * 
   * Inyectando dependencias de los sevicios
   * 
   * @param apiService // Servicio ara conectar con la api.
   * @param storageService // Servicio para acceder al storage.
   */
  constructor(private apiService: ApiService, private storageService: StorageService) { }

  ngOnInit() {
  }

  /**
   * 
   * Ejecuta la función despues de que el componente 
   * se cargue completamente.
   * 
   */
  ionViewDidEnter(){
    this.getLugares();
  }

  /**
   * 
   * Obtener Lugares de la base de datos
   */
  getLugares(){
    this.apiService.obtenerLugares().subscribe(res => {
      this.lugares = res['data'];
    }, error => {

    });

    // Obtener Lugares del Storage
    // this.storageService.getlugares()
    // .then(lugares => {
    //   this.lugares = lugares;
    // });
  }

}
