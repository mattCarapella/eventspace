import React, { Fragment, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Item, Icon, Label, Segment, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import EventListItem from './EventListItem';

export default observer(function EventList() {

  const {eventStore} = useStore();
  const {eventsByDateGroup} = eventStore;
  
  return (
    <>
      {eventsByDateGroup.map(([group, events]) => (
        <Fragment key={group}>
          <Header sub color='teal'>{group}</Header>
          <Segment>
            <Item.Group divided>
              {events.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
});