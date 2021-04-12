// src/app/pages/player/player.component.ts
// ... import statements and @Component declaration ...
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service'
import { StreamState } from "../../interfaces/stream-state";
import { CloudService } from '../../services/cloud.service'
import { FilesService } from '../../services/files.service'
import RunRun from '../../components/runrun-text'

class PlayerState {
	_playing: boolean = false;
	_mute: boolean = false;

	get paused(): boolean {
		return this._playing && this._mute
	}

	get playing(): boolean {
		return this._playing && !this._mute
	}

	get inActive(): boolean {
		return !this._playing
	}
}

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

	adState: PlayerState = new PlayerState();
	line2 = ''

	runrun = new RunRun()

	constructor(
		public audioService: AudioService,
		public cloudService: CloudService,
		public storageService: FilesService
	) {
		this.loadList()

		this.audioService.getState().subscribe(state => {
			this.state = state;
			if (state.playing) {
				this.adState._playing = true
			}
		});
	}

	ngOnInit(): void {

	}

	playStream = (url, onEvent = function (event) { }) => {
		this.audioService.playStream(url).subscribe(events => {
			// listening for fun here
			onEvent(events);
		});
	}

	openFile = (file, index) => {
		this.currentFile = { index, file };
		this.audioService.stop();

		this.storageService.getFileUrl(file.name, url => {
			this.line2 = file.name
			this.playStream(url, (event) => {
				if (event.type == 'ended') {
					setTimeout(() => {
						this.playRandomSong();
					}, 1000)
				}
			});
		})

		this.files.splice(index, 1)
	}

	stop = () => {
		this.audioService.stop();
	}

	pause = () => {
		this.mute()
	}

	mute = () => {
		this.audioService.mute(true)
		this.adState._mute = true
	}

	play = () => {
		if (this.adState.inActive) {
			this.runrun.start('...', text => {
				this.line2 = 'Bored Radio V2.2, loading' + text
			})

			setTimeout(() => {
				this.line2 = 'Loaded!'
				this.runrun.stop()
				this.files = Object.assign([], this.displayFiles)
				this.playRandomSong()
			}, 3000);
		}
		else if (this.adState.paused) {
			this.audioService.mute(false)
			this.adState._mute = false
		}
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
		else {
			this.line2 = ''
			this.adState._playing = false
		}
	}

	get displayState() {
		if (this.adState.inActive) return ''
		if (this.adState.playing == true) {
			return 'playing...'
		}
		if (this.adState.paused == true) return 'paused'
		return 'ERR'
	}

	get line1() {
		return this.displayState
	}

	get lightClass() {
		if (this.adState.inActive) return 'light'
		if (this.adState.playing) return 'light green-light'
		return 'light red-light'
	}

	loadList = (done = () => { }) => {
		this.cloudService.getSongs((songs) => {
			return songs.subscribe(files => {
				this.displayFiles = files;
				done()
			});
		})
	}

}