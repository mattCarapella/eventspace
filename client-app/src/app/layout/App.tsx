import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {eventStore} = useStore();

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  return (
    <>
      <Navbar />
      { eventStore.loadingInitial && <LoadingComponent content='Loading...' /> }
      <Container style={{ marginTop: '7em' }}>
        <EventDashboard />
      </Container>
    </>
  );
}

export default observer(App);
