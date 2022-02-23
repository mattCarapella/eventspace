import React from'react';
import {observer} from 'mobx-react-lite';
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Event} from '../../../app/models/event';
import {format} from 'date-fns';

interface Props {
  event: Event;
}

export default observer(function EventDetailsInfo({event}: Props) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon name='info' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar alternate' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event.date!, 'MMMM d, yyyy h:mm aa')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue} | {event.city}, {event.state}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});