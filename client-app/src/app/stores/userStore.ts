import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
	user: User | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	// COMPUTED PROPERTIES
	
	get isLoggedIn() {
		return !!this.user;
	}

	// ACTIONS

	login = async (creds: UserFormValues) => {
		try {
			// Make request to API to login user
			const user = await agent.Account.login(creds);
			// Store token in local storage, user in store
			store.commonStore.setToken(user.token);
			runInAction(() => this.user = user );
			history.push('/events');
			store.eventStore.loadEvents();
			store.modalStore.closeModal();

		} catch (error) {
			throw error;
		}
	}

	signup = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.signup(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => this.user = user );
			history.push('/events');
			store.modalStore.closeModal();

		} catch (error) {
			throw error;
		}
	}

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		history.push('/');
		store.eventStore.clearEvents();
	}

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			runInAction(() => this.user = user );
		} catch (error) {
			console.log(error);
		}
	}

	setImage = (image: string) => {
		if (this.user) this.user.image = image;
	}

}