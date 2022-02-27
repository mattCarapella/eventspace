import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';

interface Props {
	attendees: Profile[];
}

export default observer(function EventListItem({attendees}: Props) {
	return (
		<List horizontal>
			{attendees.map(attendee => (
				<List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
					<Image 
						src={attendee.image || '/assets/user.png'} 
						circular 
						size='mini' 
						style={{marginBottom: 5}} 
					/>
				</List.Item>
			))}
		</List>
	);
});