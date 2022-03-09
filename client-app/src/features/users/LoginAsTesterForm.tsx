import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginAsTesterForm() {
	const {userStore} = useStore();
	return (
		<Formik
			initialValues={{email:'demo@eventtime.com', password: 'Pa$$w0rd', error: null}}
			onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
				setErrors({error: 'Invalid credentials. Please try again.'}))}
		>
			{({handleSubmit, isSubmitting, errors}) => (
				<Form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
					<Header as='h1' content='Log In' textAlign='center' style={{marginBottom: 20}} />
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' type='password' />
					<ErrorMessage name='error' render={() =>
						<Label style={{marginBottom: 10}} basic color='red' content={errors.error} />
					} />
					<Button 
						type='submit'
						content='Log In'
						positive
						fluid
						loading={isSubmitting}  
					/>
				</Form>
			)}
		</Formik>
	);
});