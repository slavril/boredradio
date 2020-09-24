import { Injectable } from "@angular/core";
import { of } from "rxjs";

const root = "../../assets/songs/"
const deploy = true
const rootURL = 'https://raw.githubusercontent.com/slavril/boredradio/master/src/assets/songs/'

@Injectable({
  providedIn: "root"
})
  
export class CloudService {
  files: any = [
    "perfect.mp3",
//    "how you like that.mp3",
//    "Bad guy.mp3",
    "fell it still.mp3",
    "i love you 3000.mp3",
    'Wont go home without you.m4a',
    "I Want To Hold Your Hand.mp3",
    "You Are My Sunshine__Johnny Cash__320.mp3",
    "Don_t Let Me Go - The Click Five [Lossless_FLAC].flac",
    "I Love You - Avril Lavigne [Lossless_FLAC].flac"
  ];

  urls: any = [
    {
      url: "https://raw.githubusercontent.com/slavril/boredradio/master/src/assets/songs/how you like that.mp3",
      name: 'Perfect'
    }
  ]

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