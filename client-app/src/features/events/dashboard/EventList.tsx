import React, { SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Item, Icon, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';


export default observer(function EventList() {

  const {eventStore} = useStore();
  const { eventsByDate, loading, deleteEvent } = eventStore;
  
  const [target, setTarget] = useState('');

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {eventsByDate.map(event => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as='a'>{event.name}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div style={{ fontWeight: 'bolder', paddingTop: '9px' }}>{event.venue} | {event.city}, {event.state}</div>
              </Item.Description>
              <Item.Extra>
                <Button 
                  // onClick={() => selectEvent(event.id)}
                  as={Link}
                  to={`/events/${event.id}`}
                  floated='right' 
                  content='Info' 
                  color='blue' 
                  style={{ borderRadius: '50px' }} 
                />
                <Button 
                  icon
                  name={event.id}
                  onClick={(e) => handleEventDelete(e, event.id)} 
                  loading={loading && target === event.id} 
                  floated='right'
                  style={{ borderRadius: '50px' }} 
                >
                  <Icon name='trash alternate' />
                </Button>
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});