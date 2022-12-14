/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */
import React from 'react';
import TextField from '@mui/material/TextField';
import './styles/Feedback.css';
import { styled, alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Autocomplete from '@mui/material/Autocomplete';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import { getAllFeedback } from './service';

class OneFeedback extends React.Component {
  constructor(props) {
    super(props);
    const time = this.props.data.time;
    const newTime = time.slice(0, 19);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.questionnaire.title,
      time: newTime,
    };
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
      <Link href={`/feedback/${this.state.id}`}>
        <li>
          {/* {this.state.id}
          {' '}
          -
          {' '} */}
          {this.state.title}
          {' '}
          -
          {' '}
          {this.state.time}
        </li>
      </Link>
    );
  }
}

class FeedbackList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    try {
      const { feedbacklist } = this.props;
      if (feedbacklist === undefined) {
        return null;
      }
      const myList = Object.values(feedbacklist);
      return myList.length === 0
        ? ""
        : (myList?.map((item) => (
          <ListItem key={item.id}>
            <OneFeedback data={item} />
          </ListItem>
        )));
    } catch (e) {
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

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current: [],
      keys: [],
      title: "",
    };
    this.handleForm = this.handleForm.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const response = await getAllFeedback();
    const myData = response;
    this.setState({ data: myData });
    this.setState({ current: myData });
    const myKeys = [];
    myData.forEach((item) => {
      myKeys.push({ title: item.questionnaire.title });
    });
    this.setState({ keys: myKeys });
  }

  handleForm(e) {
    this.setState({
      title: e.target.value,
    });
    this.search(e.target.value);
  }

  search(keyword) {
    const newCurrent = [];
    this.state.data.forEach((item) => {
      const myText = item.questionnaire.title;
      if (myText.includes(keyword)) {
        newCurrent.push(item);
      }
    });
    this.setState({ current: newCurrent });
  }

  render() {
    const { title } = this.state;

    return (
      <Paper
        sx={{
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          minWidth: 375,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        variant="outlined"
        component="form"
      >
        <Grid className="feedback">
          <TextField
            label="Search"
            InputProps={{
              type: 'search',
            }}
            name="title"
            onChange={this.handleForm}
          />
        </Grid>
        <FeedbackList feedbacklist={this.state.current} />
      </Paper>
    );
  }
}
