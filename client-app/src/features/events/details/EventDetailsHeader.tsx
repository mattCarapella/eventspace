import React from'react';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';

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
                <p>{event.date}</p>
                <p>Hosted by <strong>[username]</strong></p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Attend</Button>
        <Button>Cancel</Button>
        <Button color='blue' floated='right'>Manage Event</Button>
      </Segment>
    </Segment.Group>
  );
}