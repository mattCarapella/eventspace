import React from'react';
import {Link} from 'react-router-dom';
import {Button, Header, Image, Item, Label, Segment} from 'semantic-ui-react';
import {Event} from '../../../app/models/event';
import {format} from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

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

export default observer(function EventDetailsHeader({event}: Props) {
	const {eventStore: {updateAttendance, loading, cancelEventToggle}} = useStore();
	return (
		<Segment.Group>
			<Segment basic attached='top' style={{padding: '0'}}>
				{event.isCancelled &&
					<Label
						content='This event has been cancelled' 
						style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} 
						ribbon 
						color='red' 
					/>
				}
				<Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle}/>
				<Segment style={eventImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header content={event.name} size='huge' style={{color: 'white'}} />
								<p>{format(event.date!, 'MMMM d, yyyy h:mm aa')}</p>
								<p>Hosted by <strong>{event.hostUsername}</strong></p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached='bottom'>
				{event.isHost ? (
					<>	
						<Button
							onClick={cancelEventToggle}
							content={event.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
							color={event.isCancelled ? 'green' : 'red'}
							floated='right'
							basic
							loading={loading}
						/>
						<Button 
							as={Link} 
							to={`/edit/${event.id}`} 
							content='Manage Event'
							color='blue' 
							floated='right'
						/>
					</>
				) : (
					<Button
						onClick={updateAttendance}
						content={event.isGoing ? 'Cancel' : 'Join'}
						color={event.isGoing ? 'red' : 'teal'}
						loading={loading}
					/>
				)}
			</Segment>
		</Segment.Group>
	);
});