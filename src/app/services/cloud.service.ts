import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: "root"
})
  
export class CloudService {
  files: any = []

  constructor(public dataBase: AngularFireDatabase) {
    
  }

  getUrl() {
    let newArr = this.files.map((e) => {
      let name = e.slice(0, -4)
      return {
        url: name,
        name: e,
        artist: 'unknown'
      }
    })

    return of(newArr);
  }

  getSongs(callback: (result: Observable<any>) => {}) {
    if (this.files.length > 0) return this.files;
    this.dataBase.database.ref('data').once('value').then((snapshot) => {
      const object = snapshot.toJSON()
      this.files = Object.keys(object).map(key => {
        return object[key]
      })
      callback(this.getUrl())
    })
  }
}