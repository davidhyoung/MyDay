import React, { Component } from 'react';
import contentful from 'contentful';
import moment from 'moment';
import _ from 'lodash';
// components
import { isToday } from '../helpers';
import {
  Clock,
  Schedule,
  Welcome,
} from '../components';
// styles
import './App.css';

const client = contentful.createClient({
  space: 'luuucpucpe73',
  accessToken: 'd640dbf8a61bc3870f7a479967a6d656dbce14505515b3d4d7101102dd0f7977',
});

class App extends Component {

  constructor() {
    super();
    this.pollData = this.pollData.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
    this.getDaily = this.getDaily.bind(this);
    this.getWelcome = this.getWelcome.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.state = {
      appointments: [],
      daily: [],
      welcome: null,
      currentTime: moment(),
    }
  }

  componentWillMount() {
    this.setCurrentTime();
    this.pollData();
  }

  componentDidMount() {
    // update timestamp every second
    window.setInterval(this.setCurrentTime, 30000);
    window.setInterval(this.pollData, 10000);
  }

  pollData() {
    this.getAppointments();
    this.getDaily();
    this.getWelcome();
  }

  getAppointments() {
    client.getEntries({ content_type: 'event' })
      .then(entries =>
        this.setState({ appointments: entries.items.filter(item => isToday(item.fields.startTime)) })
      );
  }

  getDaily() {
    client.getEntries({ content_type: 'daily' })
      .then(entries => 
        this.setState({ daily: entries.items })
      );
  }

  getWelcome() {
    client.getEntries({ content_type: 'welcomeMessage' })
      .then(entry =>
        this.setState({ welcome: entry.items[0] })
      );
  }

  setCurrentTime() {
    this.setState({ 
      currentTime: moment()
    });
  }

  render() {
    const { currentTime, appointments, daily, welcome } = this.state;
    const todaysEvents = _.uniq(appointments.concat(daily));
    const todaysEventsSorted = todaysEvents.sort(event => event.fields.startTime);
    const content = {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      textAlign: 'left',
      margin: '1em',
      overflow: 'hidden',
    } 
    const header = { 
      marginTop: '2em',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    }
    return (
      <div className="app">
        <div style={{
          position: 'absolute',
          right: 0,
        }}>
          <Clock currentTime={currentTime} />
        </div>
        <div style={header}>
          <h1>{currentTime.format('dddd, MMMM Do')}</h1>
        </div>
        <div style={content}>
          <Schedule 
            appointments={todaysEventsSorted}
            currentTime={currentTime}  
          />
          <Welcome 
            media={welcome && welcome.fields.media}
            message={welcome && welcome.fields.text}
          />
        </div>
      </div>
    );
  }
}

export default App;