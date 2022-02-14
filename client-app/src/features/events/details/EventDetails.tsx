import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventDetailsComments from './EventDetailsComments';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';

export default observer(function EventDetails() {
  
  const {eventStore} = useStore();
  const {selectedEvent: event, loadingInitial, loadEvent } = eventStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadEvent(id);
  }, [id, loadEvent]);

  if (loadingInitial || !event) return <LoadingComponent content='Loading...' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsComments />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
});