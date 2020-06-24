import { MapService } from './../../services/map/map.service';
import { Component, OnInit } from '@angular/core';
declare let google;
@Component({
  selector: 'app-buscar-lugares',
  templateUrl: './buscar-lugares.page.html',
  styleUrls: ['./buscar-lugares.page.scss'],
})
export class BuscarLugaresPage implements OnInit {

  public lat: number;
  public lng: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.getCurrentPosition()
    .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.mapService.initMap(this.lat, this.lng, 'map');
    });
  }

  buscarLugar(event){
    // console.log(event.detail.value)
    this.mapService.searchPlaces(event.detail.value);

  }

}
