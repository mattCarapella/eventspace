import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoImageUpload from '../../app/common/imageUpload/PhotoImageUpload';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
	profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {
	const {profileStore: {isCurrentUser}} = useStore();
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header icon='image' content='Photos'/>
					{isCurrentUser && (
						<Button 
							onClick={() => setAddPhotoMode(!addPhotoMode)}
							content={addPhotoMode ? 'Cancel': 'Add Photo'}
							basic
							floated='right'
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoImageUpload/>
						) : ( 
						<Card.Group itemsPerRow={5}>
							{profile.photos?.map(photo => (
								<Card key={photo.id}>
									<Image src={photo.url} />
								</Card> ))}
						</Card.Group>
					)}	
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
});