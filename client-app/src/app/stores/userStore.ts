import { makeAutoObservable } from "mobx";
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
			this.setUser(user);
			// Redirect logged in user to events page
			history.push('/events');

		} catch (error) {
			throw error;
		}
	}

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		history.push('/');
	}

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			this.setUser(user);
		} catch (error) {
			console.log(error);
		}
	}

	private setUser = (user: User) => {
		this.user = user;
	}

}