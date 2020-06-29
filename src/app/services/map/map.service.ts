import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare let google;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  ubicData = {
    map: '',
    marker: '',
    myUbic: ''
  }

  service: any;
  /**
   * Inyección de dependencias
   * 
   * @param geolocation // Modulo de geolocalización para usar la 
   * api de google
   */
  constructor(public geolocation: Geolocation) { 

  }

  /**
   * Obtiene mi ubicación actual
   */
  async getCurrentPosition() {
    return this.geolocation.getCurrentPosition();
  }

  /**
   * 
   * @param lat
   * @param lng
   * @param id
   * 
   * Renderiza un mapa en pantalla
   */
  async initMap(lat: number, lng: number, id: string){
    this.ubicData.myUbic = new google.maps.LatLng(lat, lng);
    this.ubicData.map = await new google.maps.Map(document.getElementById(id), {
      center: this.ubicData.myUbic,
      zoom: 12
    });
    this.service = await new google.maps.places.PlacesService(this.ubicData.map)
  }

}
