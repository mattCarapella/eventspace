import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import { Button } from 'semantic-ui-react';

interface Props {
	setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileForm({setEditMode}: Props) {
	const {profileStore: {profile, updateProfile}} = useStore();

	const validationSchema = Yup.object({
		displayName: Yup.string().required('Display name is required.'),
  	});

	return (
		<Formik
			initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
			validationSchema={validationSchema}
			onSubmit={values => {
				updateProfile(values).then(() => {
					setEditMode(false);
				});
			}}
		>
			{({isValid, isSubmitting, dirty}) => (
				<Form className='ui form'>
					<CustomTextInput placeholder='Display Name' name='displayName'/>
					<CustomTextArea rows={5} placeholder='About' name='bio'/>
					<Button 
						content='Submit'
						type='submit' 
						loading={isSubmitting} 
						disabled={isSubmitting || !isValid}
						floated='right' 
						positive 
					/>
				</Form>
			)}
		</Formik>
	);
});