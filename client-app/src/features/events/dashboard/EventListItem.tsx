import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/event';
import {format} from 'date-fns';
import EventListItemAttendee from './EventListItemAttendee';

interface Props {
  	event: Event;
}

export default observer(function EventListItem({event}: Props) {
	function truncate(text: string | undefined) {
		if (text) {
			return text.length > 300 ? text.substring(0, 297) + '...' : text;
		}
	}

  	return (
		<Segment.Group>
			<Segment>
				{event.isCancelled &&
					<Label 
						content='This event has been cancelled.' 
						attached='top' 
						color='red' 
						style={{textAlign: 'center'}} 
					/>
				}
				<Item.Group>
					<Item>
						<Item.Image src={event.host?.image || '/assets/user.png'} size='tiny' circular style={{marginBottom: 5}} />
						<Item.Content>
							<Item.Header as={Link} to={`/events/${event.id}`}>{event.name}</Item.Header>
							<Item.Description>
								Hosted by <Link to={`/profiles/${event.hostUsername}`}>{event.host?.displayName}</Link>
							</Item.Description>
							{event.isHost && (
								<Item.Description>
									<Label content='You are hosting this event' basic color='orange'/>
								</Item.Description>
							)}
							{event.isGoing && !event.isHost && (
								<Item.Description>
									<Label content='You are going to this event' basic color='teal'/>
								</Item.Description>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name='clock'/>{format(event.date!, 'MMMM d, yyyy h:mm aa')}
					<Icon name='marker'/>{event.venue}
				</span>
			</Segment>
			<Segment secondary>
				<EventListItemAttendee attendees={event.attendees!} />
			</Segment>
			<Segment clearing>
				<Grid>
					<Grid.Column width={13}>
						<span>{truncate(event.description)}</span>
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