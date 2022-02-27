import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
	attendees: Profile[];
}

export default observer(function EventListItem({attendees}: Props) {
	return (
		<List horizontal>
			{attendees.map(attendee => (
				<Popup
					key={attendee.username}
					hoverable
					trigger={
						<List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
							<Image src={attendee.image || '/assets/user.png'} circular size='mini' />
						</List.Item>
					}
				>
					<Popup.Content>
						<ProfileCard profile={attendee}/>
					</Popup.Content>
				</Popup>
			))}
		</List>
	);
});