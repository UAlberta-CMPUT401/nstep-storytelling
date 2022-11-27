import React from 'react';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import '../styles/Selection.css';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { getQuestionnaires } from '../service';

export default function Selection() {
  const [id, setId] = React.useState('');
  const [formList, setFormList] = React.useState([]);

  React.useEffect(async () => {
    const res = await getQuestionnaires();
    setFormList(res);
  }, []);

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    if (id !== '') { navigate(`/questionnaire/${id}`); }
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(0.7),
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
        <FormControl sx={{ m: 1, width: '45%' }}>
          <InputLabel id="selection-label">Select a program</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={id}
            onChange={handleChange}
            label="Program"
            input={<BootstrapInput />}
          >
            {formList.map((form) => (
              <MenuItem key={form.id} value={form.id}>{form.title}</MenuItem>
            ))}
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
          onClick={handleClick}
        >
          OK
        </Button>
      </div>
    </div>
  );
}
