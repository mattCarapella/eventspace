import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Event, EventFormValues } from "../models/event";
import {format} from 'date-fns';
import { store } from "./store";
import { Profile } from "../models/profile";

export default class EventStore {
  
	// OBSERVABLES: 

	eventsRegistry = new Map<string, Event>();
	selectedEvent: Event | undefined = undefined;
	editMode: boolean = false;
	loading: boolean = false;
	loadingInitial: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	// COMPUTED PROPERTIES: 
	// Signified by 'get', derives new state from existing state in observables

	get eventsByDate() {
		return Array.from(this.eventsRegistry.values()).sort((a,b) => 
			a.date!.getTime() - b.date!.getTime());
	}

	get eventsByDateGroup() {
		// returns events grouped by date as key value pair <date: string, events: Event[]>
		return Object.entries(
			this.eventsByDate.reduce((events, event) => {
				const date = format(event.date!, 'MMMM d, yyyy');
				events[date] = events[date] ? [...events[date], event] : [event];
				return events;
			}, {} as {[key: string]: Event[]})
		)
	}

  // ACTIONS:

  	loadEvents = async () => {
		this.setLoadingInitial(true);
		try {
			const events = await agent.Events.list();
			runInAction(() => {
				events.forEach(event => {
					this.setEvent(event);
				});
				this.setLoadingInitial(false);
			})
		} catch (error) {
			console.log(error);
			runInAction(() => { this.setLoadingInitial(false); });
		}
  	}

	loadEvent = async (id: string) => {
		// first check if event is already in memory
		let event = this.getEvent(id);
		if (event) {
			this.selectedEvent = event;
			return event;
		}
		else {
			this.loadingInitial = true;
			try {
				event = await agent.Events.details(id);
				this.setEvent(event);
				this.setSelectedEvent(event);
				this.setLoadingInitial(false);
				return event;
			} catch (error) {
				console.log(error)
			}  
		}
	}

	private getEvent = (id: string) => {
		return this.eventsRegistry.get(id);
	}

	private setEvent = (event: Event) => {
		// Get current user and set activitiy properties related to user
		const user = store.userStore.user;
		if (user) {
			event.isGoing = event.attendees?.some(attendee => attendee.username === user.username);
			event.isHost = event.hostUsername === user.username;
			event.host = event.attendees?.find(attendee => attendee.username === event.hostUsername);
		}
		event.date = new Date(event.date!);
		this.eventsRegistry.set(event.id, event);
	}

	setSelectedEvent = (event: Event) => {
		this.selectedEvent = event;
	}

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	}

	createEvent = async (event: EventFormValues) => {
		// get current user
		const currUser = store.userStore.user;
		// create new event attendee profile object
		const attendee = new Profile(currUser!);
		try {
			// make request to API
			await agent.Events.create(event);
			// populate activity properties with those in EventFormValues
			const newEvent = new Event(event);
			// set other activity properties, setActivity() also updates eventyRegistry
			newEvent.hostUsername = currUser!.username;
			newEvent.attendees = [attendee];
			this.setEvent(newEvent);
			runInAction(() => {
				// set event in store
				this.selectedEvent = newEvent;
			});
		} catch (error) { console.log(error); }
	}

	updateEvent = async (event: EventFormValues) => {
		try {
			// send request to API with EventFormValues properties
			await agent.Events.update(event);
			runInAction(() => {
				// get the original event with non EventFormValues properties and combine
				if (event.id) {
					let updatedEvent = {...this.getEvent(event.id), ...event};
					this.eventsRegistry.set(event.id, updatedEvent as Event);
					this.selectedEvent = updatedEvent as Event;
				}
			})
		} catch(error) { console.log(error); }
	}

	deleteEvent = async (id: string) => {
		this.loading = true;
		try {
			await agent.Events.delete(id);
			runInAction(() => {
				this.eventsRegistry.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => { this.loading = false; });
		}
	}

	updateAttendance = async () => {
		this.loading = true
		// get current user
		const currUser = store.userStore.user;
		try {
			// send request to API
			await agent.Events.attend(this.selectedEvent!.id);
			runInAction(() => {
				if (this.selectedEvent?.isGoing) {
					// remove current user from event attendees and set necessary event properties 
					this.selectedEvent.attendees = this.selectedEvent.attendees?.filter(
						attendee => attendee.username !== currUser?.username);
					this.selectedEvent.isGoing = false;
				} else {
					// create a new event attendee object for curr user, add to event attendees, and update necessary event properties 
					const attendee = new Profile(currUser!);
					this.selectedEvent?.attendees?.push(attendee);
					this.selectedEvent!.isGoing = true;
				}
				// update the event registry
				this.eventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
			})
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => this.loading = false);
		}
	}

	cancelEventToggle = async () => {
		this.loading = true;
		try {
			// send request to API
			await agent.Events.attend(this.selectedEvent!.id);
			runInAction(() => {
				// update isCancelled property and update the registry
				this.selectedEvent!.isCancelled = !this.selectedEvent?.isCancelled;
				this.eventsRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => { this.loading = false });
		}
	}

}







  // selectEvent = (id: string) => {
  //   // this.selectedEvent = this.events.find(x => x.id === id);
  //   this.selectedEvent = this.eventsRegistry.get(id);
  // }

  // cancelSelectedEvent = () => {
  //   this.selectedEvent = undefined;
  // }

  // openForm = (id?: string) => {
  //   id ? this.selectEvent(id) : this.cancelSelectedEvent();
  //   this.editMode = true
  // }

  // closeForm = () => {
  //   this.editMode = false;
  // }




  // This was changed in 124 to change date type from string to Date

  // private setEvent = (event: Event) => {
  //   event.date = event.date.split('T')[0];
  //   this.eventsRegistry.set(event.id, event);
  // }

  // get eventsByDate() {
  //   return Array.from(this.eventsRegistry.values()).sort((a,b) => 
  //       Date.parse(a.date) - Date.parse(b.date));
  // }

  // get eventsByDateGroup() {
  //   // returns events grouped by date as key value pair <date: string, events: Event[]>
  //   return Object.entries(
  //     this.eventsByDate.reduce((events, event) => {
  //       const date = event.date;
  //       events[date] = events[date] ? [...events[date], event] : [event];
  //       return events;
  //     }, {} as {[key: string]: Event[]})
  //   )
  // }



  // PRIOR TO USING EVENTFORMVALUES

//   createEvent = async (event: Event) => {
// 	this.loading = true;
// 	try {
// 		await agent.Events.create(event);
// 		runInAction(() => {
// 			this.eventsRegistry.set(event.id, event);
// 			this.selectedEvent = event;
// 			this.editMode = false;
// 			this.loading = false;
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		runInAction(() => { this.loading = false; });
// 	}
// }

// updateEvent = async (event: Event) => {
// 	this.loading = true;
// 	try {
// 		await agent.Events.update(event);
// 		runInAction(() => {
// 			this.eventsRegistry.set(event.id, event);
// 			this.selectedEvent = event;
// 			this.editMode = false;
// 			this.loading = false;
// 		})
// 	} catch(error) {
// 		console.log(error);
// 		runInAction(() => { this.loading = false; });
// 	}
// }