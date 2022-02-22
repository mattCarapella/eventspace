import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function EventForm() {
  const {eventStore} = useStore();
  const {loadingInitial, loading, loadEvent, createEvent, updateEvent} = eventStore;
  const {id} = useParams<{id: string}>();
  let history = useHistory();

  const [event, setEvent] = useState({
    id: '',
    name: '',
    date: '',
    description: '',
    ticketLink: '',
    category: '',
    genre: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });

  // Check to see if id exists. If so, get event from store and then populate setEvent and 
  // override whats in current useState.
  useEffect(() => {
    // '!' overrides typecheck since we know event must exist
    if (id) loadEvent(id).then(event => setEvent(event!));
  }, [id, loadEvent]);

  function handleSubmit() {
    // event.id ? updateEvent(event) : createEvent(event);
    if (event.id.length === 0) {
      let newEvent = {...event, id: uuid()}
      createEvent(newEvent).then(() => history.push(`/events/${newEvent.id}`));
    }
    else {
      updateEvent(event).then(() => history.push(`/events/${event.id}`));
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target;
    setEvent({...event, [name]: value});
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder='Name' value={event.name} name='name' onChange={handleInputChange} />
        <Form.TextArea placeholder='Description' value={event.description} name='description' onChange={handleInputChange} />
        <Form.Input placeholder='Category' value={event.category} name='category' onChange={handleInputChange} />
        <Form.Input placeholder='Ticket Link' value={event.ticketLink} name='ticketLink' onChange={handleInputChange} />
        <Form.Input type='date' placeholder='Date' value={event.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder='Venue' value={event.venue} name='venue' onChange={handleInputChange} />
        <Form.Input placeholder='City' value={event.city} name='city' onChange={handleInputChange} />
        <Form.Input placeholder='State' value={event.state} name='state' onChange={handleInputChange} />
        <Form.Input placeholder='Zipcode' value={event.zipcode} name='zipcode' onChange={handleInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/events' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
});
