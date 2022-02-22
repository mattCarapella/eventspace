import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function Navbar() {
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
      </Container>
    </Menu>
  )
}


// <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />