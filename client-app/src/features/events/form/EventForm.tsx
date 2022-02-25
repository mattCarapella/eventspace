import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import CustomDateInput from '../../../app/common/form/CustomDateInput';
import { Event } from '../../../app/models/event';

export default observer(function EventForm() {
	const {eventStore} = useStore();
	const {loadingInitial, loading, loadEvent, createEvent, updateEvent} = eventStore;
	const {id} = useParams<{id: string}>();
	let history = useHistory();

  	const [event, setEvent] = useState<Event>({
		id: '',
		name: '',
		date: null,
		description: '',
		ticketLink: '',
		cost: null,
		category: '',
		genre: '',
		venue: '',
		address: '',
		city: '',
		state: '',
		zipcode: ''
  	});

  	const validationSchema = Yup.object({
		name: Yup.string().required('Event name is required.'),
		date: Yup.string().required('Date is required.').nullable(),
		description: Yup.string().required('Description is required.'),
		category: Yup.string().required('Category is required.'),
		cost: Yup.number().typeError('Must be a number.').moreThan(-.99, 'Cost must be a positive value.'),
		venue: Yup.string().required('Venue is required.'),
		address: Yup.string().required('Address is required.'),
		city: Yup.string().required('City is required.'),
		state: Yup.string().required('State is required.'),
  	})

	// Check to see if id exists. If so, get event from store and then populate setEvent and 
	// override whats in current useState.
	useEffect(() => {
		// '!' overrides typecheck since we know event must exist
		if (id) loadEvent(id).then(event => setEvent(event!));
	}, [id, loadEvent]);

	function handleFormSubmit(event: Event) {
		if (event.id.length === 0) {
			let newEvent = {...event, id: uuid()}
			createEvent(newEvent).then(() => history.push(`/events/${newEvent.id}`));
		} else {
			updateEvent(event).then(() => history.push(`/events/${event.id}`));
		}
	}

 	if (loadingInitial) return <LoadingComponent content='Loading...' />

  	return (
		<>
			<h1>Lets build your event</h1>
			<h3>Tell us a bit more so we can help create the perfect event.</h3>
			<Segment clearing>
				<Formik
				enableReinitialize 
				initialValues={event}
				validationSchema={validationSchema}
				onSubmit={values => handleFormSubmit(values)}
				>
					{({handleSubmit, isValid, isSubmitting, dirty}) => (
						<Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
							<Header content='Event details' sub color='teal' />	
							<CustomTextInput name='name' placeholder='Name'/>
							<CustomTextArea name='description' placeholder='Description' rows={4}/>
							<CustomDateInput 
								name='date' 
								placeholderText='Date' 
								showTimeSelect
								timeCaption='time'
								dateFormat='MMMM d, yyyy, h:mm aa' 
							/>
							<CustomSelectInput 
								name='category' 
								placeholder='Category' 
								options={categoryOptions}
							/>

							<Header content='Ticket details' sub color='teal' />
							<CustomTextInput name='ticketLink' placeholder='Ticket Link'/>
							<CustomTextInput name='cost' placeholder='Cost'/>
							
							<Header content='Location details' sub color='teal' />
							<CustomTextInput name='venue' placeholder='Venue'/>
							<CustomTextInput name='address' placeholder='Address'/>
							<CustomTextInput name='city' placeholder='City'/>
							<CustomTextInput name='state' placeholder='State'/>
							<CustomTextInput name='zipcode' placeholder='Zipcode'/>
							<Button 
								loading={loading} 
								floated='right' 
								positive 
								disabled={isSubmitting || !isValid || !dirty}
								type='submit' 
								content='Submit'
							/>
							<Button 
								as={Link} 
								to='/events' 
								floated='right' 
								type='button' 
								content='Cancel'
							/>
						</Form>
					)}
				</Formik>
			</Segment>
    	</>
  	);
});


// This was removed in 117
  // function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const {name, value} = e.target;
  //   setEvent({...event, [name]: value});
  // }s