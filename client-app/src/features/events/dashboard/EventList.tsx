import React, { SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Item, Icon, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import EventListItem from './EventListItem';


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
          <EventListItem event={event} />
        ))}
      </Item.Group>
    </Segment>
  );
});