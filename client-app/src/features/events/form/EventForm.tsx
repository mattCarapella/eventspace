import React, { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function EventForm() {

  const {eventStore} = useStore();
  const { selectedEvent, loading, closeForm, createEvent, updateEvent } = eventStore;
  
  const initialState = selectedEvent ?? {
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
  }

  const [event, setEvent] = useState(initialState);

  function handleSubmit() {
    event.id ? updateEvent(event) : createEvent(event);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target;
    setEvent({...event, [name]: value});
  }

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
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
});
