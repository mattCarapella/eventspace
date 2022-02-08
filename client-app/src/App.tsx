import React, { useState, useEffect } from 'react';
import { Header, List } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then(response => {
      console.log(response);
      setEvents(response.data);
    })
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Eventspace' />
      <List>
        {events.map((event: any) => (
          <List.Item key={event.id}>
            {event.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
