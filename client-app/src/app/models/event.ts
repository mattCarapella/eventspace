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

export class EventFormValue {
	
}