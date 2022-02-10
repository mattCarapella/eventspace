import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Event } from "../models/event";
import {v4 as uuid} from 'uuid';

export default class EventStore {
  events: Event[] = [];
  selectedEvent: Event | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions

  loadEvents = async () => {
    this.setLoadingInitial(true);
    try {
      const events = await agent.Events.list();
      runInAction(() => {
        events.forEach(event => {
          event.date = event.date.split('T')[0];
          this.events.push(event);
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

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  selectEvent = (id: string) => {
    this.selectedEvent = this.events.find(x => x.id === id);
  }

  cancelSelectedEvent = () => {
    this.selectedEvent = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectEvent(id) : this.cancelSelectedEvent();
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false;
  }

  createEvent = async (event: Event) => {
    this.loading = true;
    event.id = uuid();
    try {
      await agent.Events.create(event);
      runInAction(() => {
        this.events.push(event);
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
        this.events = [...this.events.filter(x => x.id !== event.id), event];
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

}