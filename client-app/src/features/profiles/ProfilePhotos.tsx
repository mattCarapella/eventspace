import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoImageUpload from '../../app/common/imageUpload/PhotoImageUpload';
import { Photo, Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
	profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {
	const {profileStore: {isCurrentUser, uploading, loading, uploadPhoto, setMainPhoto}} = useStore();
	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState('');

	function handlePhotoUpload(file: Blob) {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	}

	function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	}

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
						<PhotoImageUpload loading={uploading} uploadPhoto={handlePhotoUpload}/>
						) : ( 
						<Card.Group itemsPerRow={5}>
							{profile.photos?.map(photo => (
								<Card key={photo.id}>
									<Image src={photo.url} />
									{ isCurrentUser && (
										<Button.Group fluid widths={2}>
											<Button
												basic
												content='Set as Main'
												color='green'
												name={photo.id}
												disabled={photo.isMain}
												onClick={e => handleSetMainPhoto(photo, e)}
											/>
											<Button
												basic
												icon='trash'
												color='red'
												disabled={photo.isMain}
											/>
										</Button.Group>
									)}
								</Card> ))}
						</Card.Group>
					)}	
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
});