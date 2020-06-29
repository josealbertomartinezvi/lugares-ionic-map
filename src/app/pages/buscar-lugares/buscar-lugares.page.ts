import { StorageService } from './../../services/storage/storage.service';
import { MapService } from './../../services/map/map.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  public ubicaciones: any = [];
  public markers: any = [];
  public busqueda: string;

  constructor(private mapService: MapService, private storageService: StorageService, public alertController: AlertController) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.recetear();
    this.mapService.getCurrentPosition()
    .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.mapService.initMap(this.lat, this.lng, 'map');
    });
  }

  recetear = () => {
    
    for(var i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    document.getElementById('map').style.height="100%";
    document.getElementById('lista').style.display="none";
    this.ubics = [];
    this.busqueda = '';

  }

  buscarLugar = (event) =>{

    this.recetear();

    this.busqueda = event.detail.value;
    if(this.busqueda != ''){
      let data = {
        location: new google.maps.LatLng(this.lat, this.lng),
        radius: 3000,
        keyword: this.busqueda
      };
      let service = this.mapService.service;

      service.nearbySearch(data, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.ubics = [];
          results.map(item => {
            this.calcularDistancia(item);
          });
          this.ubicaciones = this.ubics;
          document.getElementById('map').style.height="50%";
          document.getElementById('lista').style.display="block";
        }

      });
    }
  }

  mostrarUbicaciones(item){
    let map = this.mapService.ubicData.map;
    let infowindow = new google.maps.InfoWindow({});
      let marker = new google.maps.Marker({
        map,
        position: item.geometry.location,
      });
      marker.addListener('click', function() {
        infowindow.setContent(item.name);
        infowindow.open(map, this);
      });
      this.markers.push(marker);
  }

  calcularDistancia(item){
    let request = {
      origin: this.mapService.ubicData.myUbic,
      destination: item.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
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
          data['position'] = item.geometry.location;

          this.mostrarUbicaciones(item);

          this.ubics.push(data);
        }
    });
  }

  async savePlace(item){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar!',
      message: '¿Desea guardar esta ubicación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {
            item['busqueda'] = this.busqueda;
            this.storageService.getlugares()
            .then(async lugares => {
              if(lugares == null){
                let registro = [];
                registro[0] = item;
                this.storageService.saveData('lugares', registro);
              }else{
                lugares.push(item);
                this.storageService.saveData('lugares', lugares);
              }
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Información!',
                message: 'Ubicación guardada correctamente.',
                buttons: ['OK']
              });
              await alert.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
