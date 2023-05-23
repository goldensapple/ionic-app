import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { }

  onSetClick(key, value){
    console.log(`onSetClick(${key}, ${value}) called`);
    this.storage.set(key, value)
        .then((val) => { console.log(val); })
        .catch((err) => { console.log(err); });
  }

  onGetClick(key) {
    console.log(`onGetClick(${key}) called`);
    return new Promise(resolve => {
      this.storage.get(key).then(data => {
            resolve(data);
            console.log('onGetClick:' + data);
          },
          err => {
            console.log(err);
          });
    });
  }
}
