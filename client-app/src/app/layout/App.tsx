import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { Event } from '../models/event';
import Navbar from './Navbar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Event[]>('http://localhost:5000/api/events').then(response => {
      setEvents(response.data);
    })
  }, []);

  function handleSelectEvent(id: string) {
    setSelectedEvent(events.find(x => x.id === id));
  }

  function handleCancelSelectEvent() {
    setSelectedEvent(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectEvent(id) : handleCancelSelectEvent();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditEvent(event: Event) {
    event.id 
      ? setEvents([...events.filter(x => x.id !== event.id), event])
      : setEvents([...events, {...event, id: uuid()}]);
    setEditMode(false);
    setSelectedEvent(event);
  }

  function handleDeleteEvent(id: string) {
    setEvents([...events.filter(x => x.id !== id)]);
  }

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <EventDashboard 
          events={events} 
          selectedEvent={selectedEvent}
          selectEvent={handleSelectEvent}
          cancelSelectEvent={handleCancelSelectEvent}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Container>
    </>
  );
}

export default App;
