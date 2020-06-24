import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare let google;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;
  marker: any;
  myUbic: any;

  constructor(public geolocation: Geolocation) { }

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
    this.myUbic = new google.maps.LatLng(lat, lng);
    this.map = await new google.maps.Map(document.getElementById(id), {
      center: this.myUbic,
      zoom: 12
    });
    // const marker = new google.maps.Marker({
    //   position: {lat, lng},
    //   map: this.map,
    //   title: 'Mi Ubicación'
    // });
  }

  async searchPlaces(palabra){
    var map = this.map;
    var marker;
    var origin = this.myUbic;
    var request = {
      location: origin,
      radius: 5000,
      keyword: palabra
    };

    var service = await new google.maps.places.PlacesService(this.map);
    var directionsService = new google.maps.DirectionsService();

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.map(item => {
          marker = new google.maps.Marker({
            map,
            position: item.geometry.location,
          });
          var infowindow = new google.maps.InfoWindow({});
          marker.addListener('click', function() {
            console.log(item.name)
            infowindow.setContent(item.name);
            infowindow.open(map, this);
          });
  
          //create request
          var request = {
              origin,
              destination: item.geometry.location,
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC
          }
      
          // Routing
          directionsService.route(request, function (result, status) {
              if(status == google.maps.DirectionsStatus.OK) {
                item.distancia = result.routes[0].legs[0].distance.text;
              }
          });

        });

      }
      console.log(results)
    });
  }
}
