import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

export default observer(function EventDashboard() {

  const {eventStore} = useStore();
  const { selectedEvent, editMode, loadEvents } = eventStore;

  useEffect(() => {
    loadEvents();
  }, [eventStore]);
  
  return (
    <Grid>
      <Grid.Column width='10'>
        <EventList />
      </Grid.Column>
      <Grid.Column width='6'>
       
      </Grid.Column>
    </Grid>
  );
});