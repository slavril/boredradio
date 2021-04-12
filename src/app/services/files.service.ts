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

	getFileUrl(filename: string, callback: (url: string) => void) {
		let storageRef = this.storage.storage.ref('songs');
		storageRef.child(filename).getDownloadURL().then(url => {
			callback(url)
		})
	}

}
