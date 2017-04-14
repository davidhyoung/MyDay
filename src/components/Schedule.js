import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { isSoon, hasPassed } from '../helpers';

const HOURS = _.range(6, 19, 1);

const smallFont = '0.75em';

const Appointment = (props) => {

  const { active, passed, description, title, startTime } = props;

  const minPercent = moment(startTime).format('mm') / 60 * 100;

  const container = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }

  const appointment = {
    padding: '0.5em 0.75em',
    background: active && 'lightgreen',
    borderLeft: active && '3px solid darkgreen',
    marginLeft: active && '-1px',
    transform: !active && `translateY(${minPercent}%)`,
  }

  const titleContainer = {
    color: active ? 'darkgreen' : 'black',
    opacity: passed && 0.2,
    textDecoration: passed && 'line-through',
    fontStyle: passed && 'italic',
    fontSize: !active && smallFont,
  }

  const descriptionContainer = { 
    fontSize: smallFont,
    color: 'darkgreen',
  }

  const tick = {
    position: 'absolute',
    top: `${50 + minPercent}%`,
    height: '1px',
    width: '10px',
    background: 'lightgray',
  }

  const timeLabel = {
    position: 'absolute',
    top: `${minPercent}%`,
    transform: `translate(-100%, ${minPercent > 20 ? '-50%' : 0})`,
    padding: '0.5em',
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: '1em',
  }

  return (
    <div style={container}>
      {!active && <div style={tick} />}
      {active && 
        <div style={timeLabel}>
           {moment(startTime).format('h:mm')}
           <span style={{ fontSize: smallFont }}>{moment(startTime).format('a')}</span>
        </div>
      }
      <div style={appointment}>
        <div style={titleContainer}>{title}</div>
        {active &&
          <div style={descriptionContainer}>
            <ReactMarkdown source={description} />
          </div>
        }
      </div>
    </div>
  );
}



const Row = (props) => {

  const { appointments, hour } = props;

  const appointmentForHour = appointments.find(appointment => {
    const startHour = Number(moment(appointment.fields.startTime).format('H'));
    if (startHour === hour) {
      return appointment;
    }
    return null;
  });

  const appointmentIsSoon = appointmentForHour && isSoon(appointmentForHour);

  const row = {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: appointmentIsSoon ? 'flex-start' : 'center',
    width: '320px',
  }
  
  const time = {
    textAlign: 'right',
    width: '120px',
    flexShrink: 0,
    padding: '0.5em',
    borderRight: !appointmentIsSoon && '1px solid lightgray',
    opacity: appointmentIsSoon && 0,
    // color: appointmentIsSoon && 'lightgray',
    // fontWeight: appointmentIsSoon && 'bold',
  }

  if (appointmentForHour) {
    console.log(appointmentForHour.fields.title, isSoon(appointmentForHour))
  }
  

  return (
    <div style={row}>
      <div style={time}>
        <div style={{ fontSize: smallFont }}>
          <span>{moment(hour, 'H').format('h:mm')}</span>
          <span style={{ fontSize: smallFont }}>{moment(hour, 'H').format('a')}</span>
        </div>
      </div>
      {appointmentForHour && 
        <Appointment 
          active={appointmentIsSoon}
          passed={hasPassed(appointmentForHour)}
          description={appointmentForHour.fields.description}
          title={appointmentForHour.fields.title}
          startTime={appointmentForHour.fields.startTime}
        />
      }
    </div>
  )
}

class Schedule extends Component {

  // componentDidMount() {
  //   const { schedule } = this.refs;    
  //   setTimeout(() => {
  //     schedule.scrollTop = 100;
  //     console.log(schedule.scrollTop)
  //   }, 1000);
  // }
  
  render() {
    const { appointments } = this.props;
    const container = { 
      background: '#f3f3f3',
      border: '1px solid lightgray',
      flexShrink: 0,
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
    }
    return (
      <div ref="schedule" style={container}>
        {HOURS.map(hour =>
          <Row
            key={hour} 
            appointments={appointments} 
            hour={hour} 
          />
        )}
      </div>
    )
  }
}

export default Schedule;