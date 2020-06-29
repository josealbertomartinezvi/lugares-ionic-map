import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL del servidor
  apiURL = environment.apiURL; 

  // Encabezados de la petición
  headers: any = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
  }

  /**
   *
   * Inyectando de pendecias
   *
   * @param http // dependencia para metodos http
   *
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtener los lugares registrados en la base de datos
   */
  obtenerLugares(){
    return this.http.get(`${this.apiURL}/lugares/lista`, this.headers);
  }

  /**
   * Guardar lugar en la base de datos
   * 
   * @param lugar
   */
  guardarLugar(lugar){
    return this.http.post(`${this.apiURL}/lugares/nueva`, lugar, this.headers);
  }
}
