// src/app/pages/player/player.component.ts
// ... import statements and @Component declaration ...
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service'
import { StreamState } from "../../interfaces/stream-state";
import { CloudService } from '../../services/cloud.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
  
export class PlayerComponent {

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  )
  {
    // ... constructor code
    cloudService.getFiles().subscribe(files => {
      this.files = files
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
    
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  stop() {
    this.audioService.stop();
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  next() {
    const index = this.currentFile.index + 1;
    console.log(index);
    
    const file = this.files[index];    
    this.openFile(file, index);
  }
}