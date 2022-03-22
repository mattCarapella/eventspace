import { User } from "./user";

export interface Profile {
	username: string;
	displayName: string;
	bio?: string;
	image?: string;
	photos?: Photo[];
}

// Used to create a new EventAttendee object
export class Profile implements Profile {
	constructor (user: User) {
		this.username = user.username;
		this.displayName = user.displayName;
		this.image = user.image;
	}
}

export interface Photo {
	id: string,
	url: string,
	isMain: boolean
}