// src/app/pages/player/player.component.ts
// ... import statements and @Component declaration ...
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service'
import { StreamState } from "../../interfaces/stream-state";
import { CloudService } from '../../services/cloud.service'
import { FilesService } from '../../services/files.service'

@Component({
	selector: 'app-home-page',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})

export class PlayerComponent {

	files: Array<any> = [];
	state: StreamState;
	currentFile: any = {};
	displayFiles: Array<any> = []
	isplaying: boolean = false

	constructor(
		public audioService: AudioService,
		public cloudService: CloudService,
		public storageService: FilesService
	) {
		// ... constructor code
		cloudService.getSongs((songs) => {
			return songs.subscribe(files => {
				this.displayFiles = files;
			});
		})

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

	playStream(url, onEvent = function (event) { }) {
		this.isplaying = true
		this.audioService.playStream(url).subscribe(events => {
			// listening for fun here
			onEvent(events);
		});
	}

	openFile(file, index) {
		this.currentFile = { index, file };
		this.audioService.stop();

		this.storageService.getFileUrl(file.name, url => {		
			this.playStream(url, (event) => {
				if (event.type == 'ended') {
					this.isplaying = false
					setTimeout(() => {
						this.playRandomSong();
					}, 500)
				}
			});
		})

		this.files.splice(index, 1)		
	}

	stop() {
		this.audioService.stop();
	}

	pause() {
		if (this.isplaying == true) {
			if (this.audioService.isMute == true) {
				this.audioService.mute(false)
			}
			else {
				this.audioService.mute(true)
			}
			return;
		}
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
		this.files = Object.assign([], this.displayFiles)
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
		return randomIndex;
	}

	private playRandomSong() {
		if (this.files.length > 0) {
			let index = this.uniqueRandomIndex
			let randomElement = this.files[index];
			this.openFile(randomElement, index);
		}
	}
}