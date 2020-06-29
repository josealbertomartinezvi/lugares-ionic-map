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
    this.mapService.getCurrentPosition()
    .then(position => {
      // let lat = position.coords.latitude;
      // let lng = position.coords.longitude;
      // this.mapService.initMap(lat, lng, 'map');
    });
  }

}
