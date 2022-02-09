import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

export default function Navbar({ openForm }: Props) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Eventspace
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button onClick={openForm} positive content='Add an event' />
        </Menu.Item>
      </Container>
    </Menu>
  )
}