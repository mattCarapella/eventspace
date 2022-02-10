import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';

interface Props {
  events: Event[];
  submitting: boolean;
  deleteEvent: (id: string) => void;
}
export default function EventList({ events, submitting, deleteEvent }: Props) {

  const {eventStore} = useStore();
  const { selectEvent, loading } = eventStore;
  
  const [target, setTarget] = useState('');

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {events.map(event => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as='a'>{event.name}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>{event.venue} | {event.city}, {event.state}</div>
              </Item.Description>
              <Item.Extra>
                <Button 
                  onClick={() => selectEvent(event.id)} 
                  floated='right' 
                  content='More Info' 
                  color='blue' 
                />
                <Button 
                  name={event.id}
                  onClick={(e) => handleEventDelete(e, event.id)} 
                  loading={submitting && target === event.id} 
                  floated='right' 
                  content='Delete' 
                  color='red' 
                />
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}