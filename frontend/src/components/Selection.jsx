import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import '../styles/Selection.css';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function Selection() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(0.8),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

  return (
    <div className="selection-bg">
      <div className="selection">
        <FormControl sx={{ m: 1, width: '35%' }}>
          <InputLabel id="selection-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleChange}
            label="Program"
            input={<BootstrapInput />}
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
    </div>
  );
}
