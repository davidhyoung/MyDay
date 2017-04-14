import moment from 'moment';
import _ from 'lodash';

const __start = 6;
const __end = 18;

const isAppointment = event => {
  if (event.fields.startTime) {
    return true;
  }
  return false;
}

const isSoon = appointment => {
  const startTime = moment(appointment.fields.startTime);
  const difference = startTime.diff(moment(), 'minutes');

  // need to handle the wrong days...
  console.log(appointment.fields.title, difference, 'Daily events are broken right now here')

  return difference >= 0 && difference <= 60;
}

const hasPassed = appointment => {
  const a = moment(appointment.fields.startTime).hour() + (moment(appointment.fields.startTime).minutes() / 60);
  const b = moment().hour() + (moment().minutes() / 60);
  return a < b;
}

const nextAppointment = events => {
  if (events.length > 0) {
    return _.find(events, event => {
      // console.log(event.fields)
      return isAppointment(event) && !hasPassed(event);
    });
  }
  return null;
}

const progress = datetime => {
  let timeFromStart = moment(datetime).format('HH') - __start;
  timeFromStart += moment(datetime).format('mm') / 60;
  return timeFromStart / (__end - __start);
}

const isToday = (startTime) => {
  return moment(startTime).format('DD') === moment().format('DD');
}

module.exports = {
  hasPassed,
  isAppointment,
  isSoon,
  isToday,
  nextAppointment,
  progress,
}