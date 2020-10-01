import { Injectable } from "@angular/core";
import { of } from "rxjs";
import Data from '../../assets/songs.json'

const root = "../../assets/songs/"
const deploy = true
const rootURL = 'https://raw.githubusercontent.com/slavril/boredradio/master/src/assets/songs/'

@Injectable({
  providedIn: "root"
})
  
export class CloudService {
  files: any = Data.data

  getUrl() {
    let newArr = this.files.map((e) => {
      let name = e.slice(0, -4)
      return {
        url: rootURL + e,
        name: name,
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
}