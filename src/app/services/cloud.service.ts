import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
  
export class CloudService {
  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      url:
        "../../assets/songs/how you like that.mp3",
      name: "How you like this",
      artist: "My BlackPink"
    }
  ];

  getFiles() {
    return of(this.files);
  }
}