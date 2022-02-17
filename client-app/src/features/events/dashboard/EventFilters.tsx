import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function EventFilters() {
  return (
    <>
      <Menu vertical size='large' style={{width: '100%', marginTop: 28}}>
        <Header icon='filter' attached color='teal' content='Filter' />
        <Menu.Item content='All Events' />
        <Menu.Item content='Attending' />
        <Menu.Item content='Hosting' />
      </Menu>
      <Calendar /> 
    </>
  );
}