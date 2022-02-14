import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EventList from './EventList';

export default observer(function EventDashboard() {

  const {eventStore} = useStore();
  const {eventsRegistry, loadingInitial, loadEvents} = eventStore;

  useEffect(() => {
    if (eventsRegistry.size <= 1) loadEvents();
  }, [eventsRegistry, loadEvents]);
  
  return (
    <Grid>
      {loadingInitial && <LoadingComponent content='Loading...' />}
      <Grid.Column width='10'>
        <EventList />
      </Grid.Column>
      <Grid.Column width='6'>
       
      </Grid.Column>
    </Grid>
  );
});