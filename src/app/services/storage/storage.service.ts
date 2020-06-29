import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async getlugares(){
    return await this.storage.get('lugares')
  }

  async saveData(storage, data) {
    await this.storage.set(storage, data);
  }
}
