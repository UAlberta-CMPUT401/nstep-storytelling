import React from 'react';
import TextField from '@mui/material/TextField';
import './styles/Feedback.css';
import { styled, alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
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
import { getAllFeedback } from './service';

class oneFeedback extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.state = {
    //   id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //   title: "Program 1",
    //   time: "2022-11-19T13:48:42.051853-07:00"
    // }
    // this.getInfo();
  }

  // getInfo = async () => {
  //   const authorId = this.props.item.comment_author;
  //   var temp = await getAuthorInfo(authorId).catch(err=>{
  //     console.log("bugbugbug")
  //   });
  //   var author = temp.data;
  //   this.setState({
  //     name: author.displayName
  //   })
  // }

  render() {
    return (
      <Card variant="outlined">
        <Stack direction="row" spacing={2}>
          <li>
            {this.props.id}
            {' '}
            -
            {' '}
            {this.props.title}
            {' '}
            -
            {' '}
            {this.props.time}
          </li>
        </Stack>
      </Card>
    );
  }
}

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  renderList() {
    try {
      const { feedbacklist } = this.props;
      console.log(feedbacklist);
      if (feedbacklist === undefined) {
        return null;
      }

      return feedbacklist.length === 0
        ? "NoFeedbacks"
        : (feedbacklist?.map((item) => (
          <oneFeedback id={item.id} />
        )));
    } catch (e) {
      console.log(e);
      return (<CircularProgress />);
    }
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >

        {this.renderList()}

      </Grid>

    );
  }
}

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

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await getAllFeedback();
    const myData = response.results;
    this.setState(myData);
    console.log(myData);
  }

  render() {
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
        <FeedbackList feedbacklist={this.state.data} />
      </Paper>
    );
  }
}
