import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

interface Props {
  events: Event[];
  selectedEvent: Event | undefined;
  editMode: boolean;
  submitting: boolean,
  selectEvent: (id: string) => void;
  cancelSelectEvent: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export default function EventDashboard({ events, selectedEvent, editMode, submitting, 
      selectEvent, cancelSelectEvent, openForm, closeForm, createOrEdit, deleteEvent }: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <EventList 
          events={events} 
          submitting={submitting}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedEvent && !editMode &&
        <EventDetails 
          event={selectedEvent} 
          cancelSelectEvent={cancelSelectEvent}
          openForm={openForm}
        />}
        {editMode &&
        <EventForm 
          event={selectedEvent}
          submitting={submitting}
          closeForm={closeForm}
          createOrEdit={createOrEdit}
        />}
      </Grid.Column>
    </Grid>
  );
}