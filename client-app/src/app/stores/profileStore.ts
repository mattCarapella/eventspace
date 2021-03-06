import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
	profile: Profile | null = null;
	loadingProfile = false;
	uploading = false;
	loading = false;

	constructor() {
		makeAutoObservable(this);
	}

	// COMPUTED PROPERTIES: 

	get isCurrentUser() {
		if (store.userStore.user && this.profile) {
			return store.userStore.user.username === this.profile.username;
		}
		return false;
	}

	// ACTIONS:

	loadProfile = async (username: string) => {
		this.loadingProfile = true;
		try {
			const profile = await agent.Profiles.get(username);
			runInAction(() => {
				this.profile = profile;
				this.loadingProfile = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => this.loadingProfile = false);
		}
	}

	// updateProfile takes in Partial<Profile> since only DisplayName and Bio can be edited
	updateProfile = async (profile: Partial<Profile>) => {
		this.loading = true;
		try {
			// send request to API to update profile in database
			await agent.Profiles.update(profile);
			// updates displayName if its different than that in the store
			runInAction(() => {
				if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
					store.userStore.setDisplayName(profile.displayName);
				}
				// update profile in store
				this.profile = {...this.profile, ...profile as Profile};
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);
		}
	}

	uploadPhoto = async (file: Blob) => {
		this.uploading = true;
		try {
			// send request to API and get back photo
			const response = await agent.Profiles.uploadPhoto(file);
			const photo = response.data;
			runInAction(() => {
				// if profile is set, add photo to users photos
				if (this.profile) {
					this.profile.photos?.push(photo);
					if (photo.isMain && store.userStore.user) {
						store.userStore.setImage(photo.url);
					}
				}
				this.uploading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => this.uploading = false);
		}
	}

	setMainPhoto = async (photo: Photo) => {
		this.loading = true;
		try {
			// send request to API
			await agent.Profiles.setMainPhoto(photo.id);
			// update user image
			store.userStore.setImage(photo.url);
			runInAction(() => {
				if (this.profile && this.profile.photos) {
					// update current main photo (remove as main photo)
					this.profile.photos.find(p => p.isMain)!.isMain = false;
					// set new main photo
					this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
					// set profile image
					this.profile.image = photo.url;
					this.loading = false;
				}
			});
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);	
		} 
	}

	deletePhoto = async (photo: Photo) => {
		this.loading = true;
		try {
			// remove photo from db
			await agent.Profiles.deletePhoto(photo.id);
			// remove photo from store
			runInAction(() => {
				if (this.profile) {
					this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
					this.loading = false;
				}
			});
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);
		}
	}

}