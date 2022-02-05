import React, { useState, useEffect } from 'react';
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
    <div className="App">
      <header className="App-header">
        <ul>
          {events.map((event: any) => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
