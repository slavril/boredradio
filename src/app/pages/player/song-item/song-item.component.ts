import { Component, OnInit, Input } from '@angular/core';
import Song from '../../../models/Song'

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() song: Song
  @Input() isPlaying: boolean = false

}
