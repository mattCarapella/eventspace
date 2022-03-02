import { makeAutoObservable, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
	profile: Profile | null = null;
	loadingProfile = false;
	uploading = false;

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

}