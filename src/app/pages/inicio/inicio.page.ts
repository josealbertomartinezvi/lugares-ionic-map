import { MapService } from './../../services/map/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    /**
     * Obtener ubicación actual y solicitar prmisos de 
     * ubicación si es necesario.
     */
    this.mapService.getCurrentPosition();
  }

}
