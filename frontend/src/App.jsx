import React, { useState } from 'react';
import Form from './components/Form';

function App() {
  const [role, setRole] = useState('sport');
  const [forms, setForms] = useState(
    [
      { name: 'samplename', role: 'samplerole' },
      { name: 'samplename', role: 'samplerole' },
      { name: 'samplename', role: 'samplerole' },
      { name: 'samplename', role: 'samplerole' },
      { name: 'samplename', role: 'samplerole' },
    ],
  );
  const showForms = true;
  return (
    <div className="App">
      {showForms
        ? (
          <>
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value);
                setRole(e.target.value);
              }}
            />
            <div>
              {forms.map((form) => {
                return (<Form key={form.id} name={form.name} role={form.role} />);
              })}
            </div>
          </>
        )
        : <p>You cannot see the forms.</p>}
    </div>
  );
}

export default App;
