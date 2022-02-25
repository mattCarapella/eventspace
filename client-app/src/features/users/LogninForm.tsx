import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
	const {userStore} = useStore();
	return (
		<Formik
			initialValues={{email:'', password: ''}}
			onSubmit={values => userStore.signin(values)}
		>
			{({handleSubmit, isSubmitting}) => (
				<Form className='ui form' autoComplete='off'>
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' type='password' />
					<Button loading={isSubmitting} positive content='Sign In' type='submit' fluid />
				</Form>
			)}
		</Formik>
	);
});