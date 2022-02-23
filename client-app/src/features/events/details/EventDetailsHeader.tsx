import React from'react';
import {Link} from 'react-router-dom';
import {Button, Header, Image, Item, Segment} from 'semantic-ui-react';
import {Event} from '../../../app/models/event';
import {format} from 'date-fns';

const eventImageStyle = {
  filter: 'brightness(30%)'
}

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

interface Props {
  event: Event;
}

export default function EventDetailsHeader({event}: Props) {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{padding: '0'}}>
        <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />
        <Segment style={eventImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header content={event.name} size='huge' style={{color: 'white'}} />
                <p>{format(event.date!, 'MMMM d, yyyy h:mm aa')}</p>
                <p>Hosted by <strong>[username]</strong></p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Attend</Button>
        <Button>Cancel</Button>
        <Button as={Link} to={`/edit/${event.id}`} color='blue' floated='right'>Edit Event</Button>
      </Segment>
    </Segment.Group>
  );
}