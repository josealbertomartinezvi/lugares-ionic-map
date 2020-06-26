import { async } from '@angular/core/testing';
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
  public ubics: any = [];
  public markers: any = [];
  i = 0;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.getCurrentPosition()
    .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.mapService.initMap(this.lat, this.lng, 'map');
    });
  }

  sortFloat(a,b) { return a.distancia - b.distancia }

  buscarLugar =  (event) =>{
    for(var i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    this.ubics = [];

    if(event.detail.value != ''){
      let data = {
        location: new google.maps.LatLng(this.lat, this.lng),
        radius: 1000,
        keyword: event.detail.value
      };
      let service = this.mapService.service;
      let map = this.mapService.ubicData.map;

      service.nearbySearch(data, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let infowindow = new google.maps.InfoWindow({});
          results.map(item => {
            let marker = new google.maps.Marker({
              map,
              position: item.geometry.location,
            });
            marker.addListener('click', function() {
              infowindow.setContent(item.name);
              infowindow.open(map, this);
            });
            this.markers.push(marker);
            this.calcularDistancia(item);
          });
          console.log(this.ubics)
        }
      });
    }


  }

  calcularDistancia(item){
    let request = {
      origin: this.mapService.ubicData.myUbic,
      destination: item.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
      // unitSystem: google.maps.UnitSystem.METRIC
    }
    let directionsService = new google.maps.DirectionsService();
    let data = {};
    
    // Routing .slice(0, -3)
    directionsService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
          data['nombre'] = item.name;
          data['direccion'] = result.routes[0].legs[0].end_address;
          data['distancia'] = result.routes[0].legs[0].distance.text;
          data['lat_origen'] = request.origin['lat']();
          data['lng_origen'] = request.origin['lng']();
          data['lat_destino'] = request.destination['lat']();
          data['lng_destino'] = request.destination['lng']();

          this.ubics.push(data);
        }
    });
  }

  savePlace(item){
    console.log(item)
  }

}
