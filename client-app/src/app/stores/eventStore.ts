import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Event } from "../models/event";

export default class EventStore {
  eventsRegistry = new Map<string, Event>();
  selectedEvent: Event | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // COMPUTED PROPERTIES (as per the 'get') derives new state from existing state in observables

  get eventsByDate() {
    return Array.from(this.eventsRegistry.values()).sort((a,b) => 
          Date.parse(a.date) - Date.parse(b.date));
  }

  // ACTIONS

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
      runInAction(() => {
        this.setLoadingInitial(false);
      })
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
    event.date = event.date.split('T')[0];
    this.eventsRegistry.set(event.id, event);
  }

  setSelectedEvent = (event: Event) => {
    this.selectedEvent = event;
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  createEvent = async (event: Event) => {
    this.loading = true;
    try {
      await agent.Events.create(event);
      runInAction(() => {
        this.eventsRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  updateEvent = async (event: Event) => {
    this.loading = true;
    try {
      await agent.Events.update(event);
      runInAction(() => {
        this.eventsRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.editMode = false;
        this.loading = false;
      })
    } catch(error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
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
      runInAction(() => {
        this.loading = false;
      });
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