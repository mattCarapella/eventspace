import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
	const {userStore} = useStore();
	return (
		<Formik
			initialValues={{email:'', password: '', error: null}}
			onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
				setErrors({error: 'Invalid credentials. Please try again.'}))}
		>
			{({handleSubmit, isSubmitting, errors}) => (
				<Form className='ui form' autoComplete='off'>
					<Header as='h1' content='Log In' textAlign='center' style={{marginBottom: 20}} />
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' type='password' />
					<ErrorMessage name='error' render={() =>
						<Label style={{marginBottom: 10}} basic color='red' content={errors.error} />
					} />
					<Button loading={isSubmitting} positive content='Log In' type='submit' fluid />
				</Form>
			)}
		</Formik>
	);
});