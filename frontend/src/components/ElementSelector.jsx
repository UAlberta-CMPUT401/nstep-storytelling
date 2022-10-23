import React from 'react';
import TextInput from './TextInput';

export default function ElementSelector() {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <select name="language" id="language">
          <option value="javascript">Text</option>
          <option value="python">Audio</option>
          <option value="c++">Video</option>
        </select>
      </div>
      <button onClick={() => setIsToggled(true)}>
        Add
      </button>

      {isToggled && <TextInput />}
    </>
  );
}
