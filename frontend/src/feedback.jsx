import React from 'react';
import TextField from '@mui/material/TextField';
import './styles/Feedback.css';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Feedback() {
  return (
    <Paper
      sx={{
        mx: 'auto', // margin left & right
        my: 4, // margin top & botom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
        alignSelf: 'center',
      }}
      variant="outlined"
      component="form"
    >
      <div className="feedback">
        <InputBase
          align="center"
          id="filled-search"
          label="Search"
          type="search"
          variant="filled"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for stories"
          inputProps={{ 'aria-label': 'Search for stories' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <li>John Doe - Certificate Program Level 1 Post-Assessment Survey</li>
      <li>Anonymous - Certificate Program Level 1 Post-Assessment Survey</li>
      <li>Joe Brown - Certificate Program Level 1 Pre-Assessment Survey</li>
    </Paper>
  );
}
