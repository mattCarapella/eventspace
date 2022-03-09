import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
// import { Cropper } from 'react-cropper';

interface Props {
	loading: boolean;
	uploadPhoto: (file: Blob) => void;
}

export default function PhotoImageUpload({loading, uploadPhoto}: Props) {
	const [files, setFiles] = useState<any>([]);
	const [cropper, setCropper] = useState<Cropper>();

	// passed to onInitialize property of cropper in PhotoWidgetCropper
	function onCrop() {
		if (cropper) {
			cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
		}
	}

	// clean up 'preview: URL.createObjectURL(file)' (from PhotoImageDropzone) from memory after use
	useEffect(() => {
		return () => {
			files.forEach((file: any) => URL.revokeObjectURL(file.preview));
		}
	}, [files]);

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
					<PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
				)}
			</Grid.Column>
			<Grid.Column width={1}/>
			<Grid.Column width={4}>
				<Header sub color='teal' content='Preview and upload your image'/>
				{files && files.length > 0 &&
					<>
						<div className='img-preview' style={{minHeight: 200, overflow: 'hidden'}}/>
						<Button.Group widths={2} style={{paddingTop: 10}}>
							<Button onClick={onCrop} positive icon='check' loading={loading}/>
							<Button onClick={() => setFiles([])} color='red' icon='close' disabled={loading}/>
						</Button.Group>

					</>
				}
			</Grid.Column>
		</Grid>
	);
}


// {files && files.length > 0 && (
// 	<Image src={files[0].preview} />
// )}