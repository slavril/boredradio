import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FilesService } from './files.service'

const root = "../../assets/songs/"
const deploy = true

@Injectable({
  providedIn: "root"
})
  
export class CloudService {
  files: any = []
  dataBase: AngularFireDatabase

  constructor(db: AngularFireDatabase, public storage: FilesService) {
    this.dataBase = db
    db.database.ref('data').once('value').then((snapshot) => {
      const object = snapshot.toJSON()
      this.files = Object.keys(object).map(key => {
        return object[key]
      })
    })
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

  getLocalFile() {
    let newArr = this.files.map((e) => {
      let name = e.slice(0, -4)
      return {
        url: root + e,
        name: name,
        artist: 'unknown'
      }
    })

    return of(newArr);
  }

  getFiles() {
    if (deploy == true) return this.getUrl()
    return this.getLocalFile()
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