import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar() {
  
  const {eventStore} = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          EventTime
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button onClick={() => eventStore.openForm()} positive content='Add an event' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}