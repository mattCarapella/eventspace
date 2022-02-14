import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import { useStore } from '../../../app/stores/store';

interface Props {
  event: Event;
}

export default observer(function EventListItem({event}: Props) {
  const {eventStore} = useStore();
  const { eventsByDate, loading, deleteEvent } = eventStore;
  
  const [target, setTarget] = useState('');

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }
  
  return (
    <Item key={event.id}>
      <Item.Content>
        <Item.Header as='a'>{event.name}</Item.Header>
        <Item.Meta>{event.date}</Item.Meta>
        <Item.Description>
          <div>{event.description}</div>
          <div style={{fontWeight: 'bold', paddingTop: 7}}>{event.venue} | {event.city}, {event.state}</div>
        </Item.Description>
        <Item.Extra>
          <Button
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
        </Item.Extra>
      </Item.Content>
    </Item>
  );
});