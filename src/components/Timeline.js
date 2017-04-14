import React from 'react';
import moment from 'moment';
import { isSoon, progress } from '../helpers';

const font = {
  small: '16px',
  normal: '20px',
}

const AppointmentTick = (props) => {
  const { appointment } = props;
  const { startTime, title } = appointment.fields;
  const appointmentIsSoon = isSoon(appointment);
  return (
    <div 
      style={{
        position: 'absolute',
        left: `${progress(startTime) * 100}%`,
        padding: '5px',
        textAlign: 'left',
        fontSize: font.small,
        color: appointmentIsSoon ? 'green' : 'gray',
        borderLeft:'1px solid gray',
        borderColor: appointmentIsSoon && 'green',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {title}
    </div>
  )
}

const TimeLabels = () => {
  const labels = [
    '6am', '7am', '8am', '9am', '10am', '11am', 
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm',
  ];
  return (
    <div 
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      {labels.map((label, index) => 
        <div 
          key={index} 
          style={{
            backgroundColor: 'lightgray',
            width: '1px',
            height: '1em',
            fontSize: font.normal,
          }}>
          <span 
            style={{ 
              color:'gray',
              position: 'absolute',
              top: '-1.5em',
              transform: 'translateX(-50%)',
            }}>
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

const AppointmentLabels = (props) => {
  const { appointments } = props;
  return (
    <div 
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      {appointments && appointments.map((appointment, index) => 
        <AppointmentTick 
          key={index}
          appointment={appointment}
        />
      )}
    </div>
  )
}

const ProgressBarFill = () => {
  const currentTime = moment();
  return (
    <div 
      style={{ 
        position: 'absolute',
        top: 0,
        width: `${progress(currentTime) * 100}%`,
        height: '100%',
        backgroundColor: 'lightgreen',
        zIndex: 1,
        fontSize: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      {currentTime.format('hh:mma')}
    </div>
  )
}

const ProgressBar = () => (
  <div 
    style={{
      position: 'relative', 
      background: 'lightgray', 
      height: '20px',
    }}>
    <ProgressBarFill />
  </div>
)

const Timeline = (props) => {

  return (
    <div 
      style={{
        margin: '1em', 
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
      <TimeLabels />
      <ProgressBar />
      <AppointmentLabels appointments={props.appointments} />
    </div>
  )
}

export default Timeline;