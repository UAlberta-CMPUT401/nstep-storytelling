import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import './styles/Selection.css';

export default function Selection() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="selection">
      <FormControl sx={{ m: 1, minWidth: 800 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Program</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Program"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Program 1</MenuItem>
          <MenuItem value={21}>Program 2</MenuItem>
          <MenuItem value={22}>Program 3</MenuItem>
        </Select>
      </FormControl>
      <Button
        style={{
          borderRadius: 25,
          backgroundColor: '#FDCA00',
          color: '#414143',
          fontWeight: 'bold',
        }}
        variant="contained"
      >
        OK
      </Button>
    </div>
  );
}
