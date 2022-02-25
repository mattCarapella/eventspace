import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function Navbar() {
	const {userStore: {user, logout}} = useStore();
  return (
    <Menu inverted borderless fixed='top'>
      <Container>
        <Menu.Item as={Link} to='/' style={{ fontSize: '1.5em' }} exact='true' header>
          EventTime
        </Menu.Item>
        <Menu.Item name='Events' as={Link} to='/events' position='right' />
        <Menu.Item name='Errors' as={Link} to='/errors'  />
        <Menu.Item>
          <Button as={Link} to='/createEvent' positive content='Add an event' />
        </Menu.Item>
		<Menu.Item>
			<Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
			<Dropdown pointing='top left' text={user?.displayName}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
					<Dropdown.Item onClick={logout} text='Log Out' icon='power' />
 				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
      </Container>
    </Menu>
  );
});


// <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />