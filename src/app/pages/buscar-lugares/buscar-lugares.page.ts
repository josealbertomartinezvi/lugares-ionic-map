import { ApiService } from './../../services/api/api.service';
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

  /**
   * 
   * Inyección de dependencias
   * 
   * @param apiService // servicio para comunicación para la api
   * @param mapService // servicio para la api del mapa
   * @param storageService // servicio del storage
   * @param alertController // alertas y notificaciones
   */
  constructor(private apiService: ApiService, private mapService: MapService, private storageService: StorageService, public alertController: AlertController) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.recetear();

    /**
     * Obtener posición actual y ubicar en el mapa
     */
    this.mapService.getCurrentPosition()
    .then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.mapService.initMap(this.lat, this.lng, 'map');
    });
  }

  /**
   * Recetear vista del mapa
   */
  recetear = () => {
    
    for(var i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    document.getElementById('map').style.height="100%";
    document.getElementById('lista').style.display="none";
    this.ubics = [];
    this.busqueda = '';

  }

  /**
   * 
   * Buscar lugar escrito
   * 
   * @param event 
   */
  buscarLugar = (event) =>{

    this.recetear();
    this.busqueda = event.detail.value;

    if(this.busqueda != ''){
      let data = {
        location: new google.maps.LatLng(this.lat, this.lng), // Ubicación actual
        radius: 3000, // radio de busqueda en metros
        keyword: this.busqueda // busqueda
      };

      let service = this.mapService.service;

      /**
       * Obtener listado de lugares de la api de google
       */
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

  /**
   * 
   * Mostrar lugares cercanos en el mapa
   * 
   * @param lugar 
   */
  mostrarUbicaciones(lugar){
    let map = this.mapService.ubicData.map;
    let infowindow = new google.maps.InfoWindow({});
      let marker = new google.maps.Marker({
        map,
        position: lugar.geometry.location,
      });
      marker.addListener('click', function() {
        infowindow.setContent(lugar.name);
        infowindow.open(map, this);
      });
      this.markers.push(marker);
  }

  /**
   * 
   * Calcular distancia entre la ubicación actual 
   * y el lugar encontrado
   * 
   * @param lugar 
   */
  calcularDistancia(lugar){
    let request = {
      origin: this.mapService.ubicData.myUbic,
      destination: lugar.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
    }
    let directionsService = new google.maps.DirectionsService(); // Servicio de google para obtener la distancia
    let data = {}; // variable para almacenar los datos importantes

    directionsService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
          data['nombre'] = lugar.name;
          data['direccion'] = result.routes[0].legs[0].end_address;
          data['distancia'] = result.routes[0].legs[0].distance.text;
          data['lat_origen'] = request.origin['lat']();
          data['lng_origen'] = request.origin['lng']();
          data['lat_destino'] = request.destination['lat']();
          data['lng_destino'] = request.destination['lng']();

          this.mostrarUbicaciones(lugar);

          this.ubics.push(data);
        }
    });
  }

  /**
   * 
   * Guardar lugares seleccionados
   * 
   * @param lugar 
   */
  async savePlace(lugar){
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
            lugar['busqueda'] = this.busqueda;
            this.apiService.guardarLugar(lugar).subscribe(async res => {
              console.log(res)
              if(res['success']){
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Información!',
                  message: 'Ubicación guardada correctamente.',
                  buttons: ['OK']
                });
                await alert.present();
              }else{
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Información!',
                  message: 'Error al guardar ubicación.',
                  buttons: ['OK']
                });
                await alert.present();
              }
            });

            // Guardar lugar en el storage
            // this.storageService.getlugares()
            // .then(async lugares => {
            //   if(lugares == null){
            //     let registro = [];
            //     registro[0] = item;
            //     this.storageService.saveData('lugares', registro);
            //   }else{
            //     lugares.push(item);
            //     this.storageService.saveData('lugares', lugares);
            //   }
            //   const alert = await this.alertController.create({
            //     cssClass: 'my-custom-class',
            //     header: 'Información!',
            //     message: 'Ubicación guardada correctamente.',
            //     buttons: ['OK']
            //   });
            //   await alert.present();
            // });
          }
        }
      ]
    });

    await alert.present();
  }

}
