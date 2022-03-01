import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import EventDetails from '../../features/events/details/EventDetails';
import EventForm from '../../features/events/form/EventForm';
import HomePage from '../../features/home/HomePage';
import TestErrors from '../../features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import SignupForm from '../../features/users/SignupForm';
import ProfilePage from '../../features/profiles/ProfilePage';

function App() {
	const location = useLocation();
	const {commonStore, userStore} = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded) return <LoadingComponent content='Loading...'/>

	return (
		<>
		<ToastContainer position='bottom-right' hideProgressBar/>
		<ModalContainer />
		<Route exact path='/' component={HomePage}/>
		<Route
			path={'/(.+)'} 
			render = {() => (
			<>
				<Navbar />
				<Container style={{marginTop: '7em'}}>
					<Switch>
						<Route exact path='/events' component={EventDashboard}/>
						<Route path='/events/:id' component={EventDetails}/>
						<Route path={['/createEvent', '/edit/:id']} key={location.key} component={EventForm}/>
						<Route path='/profiles/:username' component={ProfilePage}/>
						<Route path='/errors' component={TestErrors}/>
						<Route path='/server-error' component={ServerError}/>
						<Route path='/login' component={LoginForm}/>
						<Route path='/signup' component={SignupForm}/>
						<Route component={NotFound}/>  
					</Switch>
				</Container>
			</>
			)}
		/>
		</>
	);
}

export default observer(App);



