import { Profile } from "./profile";

export interface Event {
  id: string;
  name: string;
  date: Date | null;
  description: string;
  cost: string;
  costMax: string;
  ticketLink: string;
  numberOfTickets: string;
  category: string;
  genre: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  hostUsername: string;
  isCancelled: boolean;
  attendees: Profile[];
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
}

export class Event implements Event {
	constructor(init?: EventFormValues) {
		// Copies ActivityFormValue properties to Activity
		// Object.assign(T, S) copies values from source S to target T
		Object.assign(this, init);
	}
}

export class EventFormValues {
	// includes the necessary event properties for creating and updating,
	// without those creating in the front end which can not be included
	// in the API request

	id?: string | undefined;
	name: string = '';
	date: Date | null = null;
	description: string = '';
	cost: string = '';
	costMax: string = '';
	ticketLink: string = '';
	numberOfTickets: string = '';
	category: string = '';
	genre: string = '';
	venue: string = '';
	address: string = '';
	city: string = '';
	state: string = '';
	zipcode: string = '';
	country: string = '';	

	constructor(event?: EventFormValues) {
		if (event) {
			this.id = event.id;
			this.name = event.name;
			this.date = event.date;
			this.description = event.description;
			this.cost = event.cost;
			this.costMax = event.costMax;
			this.ticketLink = event.ticketLink;
			this.numberOfTickets = event.numberOfTickets;
			this.category = event.category;
			this.genre = event.genre;
			this.venue = event.venue;
			this.city = event.city;
			this.state = event.state;
			this.zipcode = event.zipcode;
			this.country = event.country;
		}
	}

}