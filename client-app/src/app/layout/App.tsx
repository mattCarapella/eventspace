import React from 'react';
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import EventDetails from '../../features/events/details/EventDetails';
import EventForm from '../../features/events/form/EventForm';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
 
  return (
    <>
      
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/events' component={EventDashboard} />
        <Route path='/events/:id' component={EventDetails} />
        <Route path={['/createEvent', '/edit/:id']} key={location.key} component={EventForm} />
      </Container>
    </>
  );
}

export default observer(App);



