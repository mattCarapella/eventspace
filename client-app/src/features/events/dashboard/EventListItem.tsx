import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';

interface Props {
  event: Event;
}

export default observer(function EventListItem({event}: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image src='/assets/user.png' size='tiny' circular />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>{event.name}</Item.Header>
              <Item.Description>Hosted by [username]</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock'/>{event.date}
          <Icon name='marker'/>{event.venue}
        </span>
      </Segment>
      <Segment secondary>
        [attendees]
      </Segment>
      <Segment clearing>
        <Grid>
          <Grid.Column width={13}>
            <span>{event.description}</span>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              as={Link}
              to={`/events/${event.id}`}
              color='teal'
              content='More Info'
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});

// TO FIX:
// Button overflows grid when window is sized down