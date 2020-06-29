import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * 
   * Inyección de dependencia.
   * 
   * @param storage // Modulo para comunicarse con el storage
   */
  constructor(private storage: Storage) { }

  /**
   * Obtener lugares del storage.
   */
  async getlugares(){
    return await this.storage.get('lugares')
  }

  /**
   * 
   * Guardar información en el storage
   * 
   * @param key // clave del storage
   * @param data // información para guardar en el storage
   */
  async saveData(key, data) {
    await this.storage.set(key, data);
  }
}
