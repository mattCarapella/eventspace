import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

interface Props {
  events: Event[];
  submitting: boolean,
  deleteEvent: (id: string) => void;
}

export default observer(function EventDashboard({ events, submitting, deleteEvent }: Props) {

  const {eventStore} = useStore();
  const { selectedEvent, editMode } = eventStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <EventList 
          events={events} 
          submitting={submitting}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedEvent && !editMode &&
        <EventDetails />}
        {editMode &&
        <EventForm />}
      </Grid.Column>
    </Grid>
  );
});