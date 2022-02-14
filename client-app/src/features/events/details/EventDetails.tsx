import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function EventDetails() {
  
  const {eventStore} = useStore();
  const {selectedEvent: event, loadingInitial, loadEvent } = eventStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadEvent(id);
  }, [id, loadEvent]);

  if (loadingInitial || !event) return <LoadingComponent content='Loading...' />

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${event.category}.jpg`} key={`/assets/categoryImages/${event.category}.jpg`} />
      <Card.Content>
        <Card.Header>{event.name}</Card.Header>
        <Card.Meta>
          <span>{event.date}</span>
        </Card.Meta>
        <Card.Description>
          {event.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button as={Link} to={`/edit/${event.id}`} basic color='blue' content='Edit' />
          <Button as={Link} to='/events' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});