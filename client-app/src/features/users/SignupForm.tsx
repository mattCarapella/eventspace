import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function SignupForm() {
	const {userStore} = useStore();
	return (
		<Formik
			initialValues={{displayName: '', username: '', email:'', password: '', error: null}}
			// values and setErrors are Formik helpers
			onSubmit={(values, {setErrors}) => userStore.signup(values).catch(error =>
				setErrors({error: error}))}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
				username: Yup.string().required(),
				email: Yup.string().required().email(),
				password: Yup.string().required()
			})}
		>
			{({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
				<Form className='ui form error' autoComplete='off'>
					<Header as='h1' content='Sign Up for EventTime' textAlign='center' style={{marginBottom: 20}} />
					<CustomTextInput name='displayName' placeholder='Display Name' />
					<CustomTextInput name='username' placeholder='Username' />
					<CustomTextInput name='email' placeholder='Email' />
					<CustomTextInput name='password' placeholder='Password' type='password' />
					<ErrorMessage name='error' render={() =>
						<ValidationErrors errors={errors.error}/>
					} />
					<Button 
						disabled={!isValid || !dirty || isSubmitting}
						loading={isSubmitting} 
						positive 
						content='Sign Up' 
						type='submit' 
						fluid 
					/>
				</Form>
			)}
		</Formik>
	);
});


// <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />