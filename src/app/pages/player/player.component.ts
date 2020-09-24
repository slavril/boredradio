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
	) {
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

	playStream(url, onEvent = function(event){}) {
		this.audioService.playStream(url).subscribe(events => {
			// listening for fun here
			onEvent(events);
		});
	}

	openFile(file, index) {
		this.currentFile = { index, file };
		this.audioService.stop();
		this.playStream(file.url, (event) => {
			if (event.type == 'ended') {
				setTimeout(() => {
					this.playRandomSong();
				}, 500)
			}
		});
	}

	stop() {
		this.audioService.stop();
	}

	pause() {
		//this.audioService.mute()
		//this.audioService.pause();
	}

	mute() {
		if (this.audioService.isMute == true) {

			this.audioService.mute(false)
		}
		else {
			this.audioService.mute(true)
		}
	}

	play() {
		this.playRandomSong()
	}

	previous() {
		const index = this.currentFile.index - 1;
		const file = this.files[index];
		this.openFile(file, index);
	}

	next() {
		const index = this.currentFile.index + 1
		const file = this.files[index];
		this.openFile(file, index);
	}

	private get uniqueRandomIndex() {
		let randomIndex = Math.floor(Math.random() * this.files.length)
		if (randomIndex == this.currentFile.index) {
			return this.uniqueRandomIndex;
		}

		return randomIndex;
	}

	private playRandomSong() {
		let index = this.uniqueRandomIndex
		let randomElement = this.files[index];
		this.openFile(randomElement, index);
		return randomElement;
	}
}