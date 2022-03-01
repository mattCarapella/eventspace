import React, { useState } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

export default function PhotoImageUpload() {
	const [files, setFiles] = useState<any>([]);
	return (
		<Grid>
			<Grid.Column width={4}>
				<Header sub color='teal' content='Add an image'/>
				<PhotoWidgetDropzone setFiles={setFiles}/>
			</Grid.Column>
			<Grid.Column width={1}/>
			<Grid.Column width={4}>
				<Header sub color='teal' content='Adjust your image'/>
				{files && files.length > 0 && (
					<Image src={files[0].preview} />
				)}
			</Grid.Column>
			<Grid.Column width={1}/>
			<Grid.Column width={4}>
				<Header sub color='teal' content='Preview and upload your image'/>
			</Grid.Column>
		</Grid>
	);
}