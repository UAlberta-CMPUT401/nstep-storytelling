import React from 'react';
import Form from './components/Form';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('sport');
  const showForms = true;
  return (
    <div className="App">
      {showForms
        ? (
          <>
          <input type='text' onChange={(e) => {
            console.log(e.target.value);
            setRole(e.target.value);
          }}/>
            <Form name="eating activity" role="healthiness" />
            <Form name="running activity" role={role}/>
            <Form name="jumping activity  " />
          </>
        )
        : <p>You cannot see the forms.</p>}
    </div>
  );
}

export default App;
