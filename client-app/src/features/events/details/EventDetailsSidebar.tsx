import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Event } from '../../../app/models/event';

interface Props {
	event: Event
}

export default function EventDetailsSidebar({event: {attendees, host}}: Props) {
  if (!attendees) return null;
	return (
    	<>
			<Segment
				textAlign='center'
				style={{border: 'none'}}
				attached='top'
				secondary
				inverted
				color='teal'
			>
				{attendees.length} {attendees.length > 1 ? 'people are' : 'person is'} going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{attendees.map(attendee => (
						<Item key={attendee.username} style={{position: 'relative'}}>
							{attendee.username === host?.username && (
								<Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Host'/>
							)}
							<Image src={attendee.image || `/assets/user.png`} size='tiny'/>
							<Item.Content verticalAlign='middle'>
								<Item.Header as='h3'>
									<Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
								</Item.Header>
							</Item.Content>
						</Item>
					))}
				</List>
			</Segment>
   		</>
  	);
}