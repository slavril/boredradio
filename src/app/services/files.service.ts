import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root'
})
export class FilesService {

	storage: AngularFireStorage

	constructor(storage: AngularFireStorage) {
		this.storage = storage
	}

	getFile() {
		let storageRef = this.storage.storage.ref('songs');
		storageRef.child('xedaplofi.mp3').getDownloadURL().then(url => {
			console.log(url);
		})

		storageRef.listAll().then(res => {
			let urlList = res.items.map((e) => {
				return {
					url: e.name,
					name: 'name',
					artist: 'unknown'
				}
			})
		})
	}

	getFileUrl(filename, callback) {
		let storageRef = this.storage.storage.ref('songs');
		storageRef.child(filename).getDownloadURL().then(url => {
			callback(url)
		})
	}

}
