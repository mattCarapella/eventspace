import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import { Event } from '../models/event';
import Navbar from './Navbar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  // function handleCreateOrEditEvent(event: Event) {
  //   setSubmitting(true);
  //   if (event.id) {
  //     // update existing event
  //     agent.Events.update(event).then(() => {
  //       setEvents([...events.filter(x => x.id !== event.id), event]);
  //       setSelectedEvent(event);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     });
  //   }
  //   else {
  //     // create a new event
  //     event.id = uuid();
  //     agent.Events.create(event).then(() => {
  //       setEvents([...events, event]);
  //       setSelectedEvent(event);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     });
  //   }  
  // }

  function handleDeleteEvent(id: string) {
    setSubmitting(true);
    agent.Events.delete(id).then(() => {
      setEvents([...events.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  }

  return (
    <>
      <Navbar />
      { eventStore.loadingInitial && <LoadingComponent content='Loading...' /> }
      <Container style={{ marginTop: '7em' }}>
        <EventDashboard 
          events={eventStore.events} 
          deleteEvent={handleDeleteEvent}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
