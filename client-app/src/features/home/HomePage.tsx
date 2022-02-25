import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import SignupForm from '../users/SignupForm';

export default observer(function HomePage() {
	const {userStore, modalStore} = useStore();
  	return (
    	<Segment inverted textAlign='center' vertical className='masthead'>
			<Container text>
				<Header as='h1' inverted>
          			<Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
          			Event Time
        		</Header>
        		<Header as='h2' inverted content='Welcome to EventTime' />
				{userStore.isLoggedIn ? (
					<Button as={Link} to='/events' size='huge' inverted>
						Explore Events
					</Button>
				) : (
					<>	
						<Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
							Sign In
						</Button>
						<Button onClick={() => modalStore.openModal(<SignupForm/>)} size='huge' inverted>
							Sign Up
						</Button>
					</>
				)}
			</Container>
    	</Segment>
	);
});



// <>
// <h1>Explore upcoming events.</h1>
// <h2>Connect with friends.</h2>
// <h3>Make memories.</h3>
// </>