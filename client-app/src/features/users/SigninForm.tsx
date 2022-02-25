import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';

export default function SigninForm() {
	return (
		<Formik
			initialValues={{email:'', password: ''}}
			onSubmit={values => console.log(values)}
		>
			{({handleSubmit}) => (
				<Form className='ui form' autoComplete='off'>
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' />
					<Button positive content='Sign In' type='submit' fluid />
				</Form>
			)}
		</Formik>
	);
}