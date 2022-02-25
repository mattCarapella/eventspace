import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';

export default function SignupForm() {
	return (
		<Formik
			initialValues={{displayName: '', username: '', email: '', password: ''}}
			onSubmit={values => console.log(values)}
		>
			{({handleSubmit}) => (
				<Form className='ui form' autoComplete='off'>
					<CustomTextInput name='displayName' placeholder='Display Name' />
					<CustomTextInput name='username' placeholder='Username' />
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' />
					<Button positive content='Sign Up' type='submit' fluid />
				</Form>
			)}
		</Formik>
	);
}