import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';
import TimeGrid from './TimeGrid';

class Month extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = TimeGrid.defaultProps;

  render() {
    let { date, ...props } = this.props
    let range = [...Month.range(date, this.props),] 

    return (
      <TimeGrid 
        {...props}
        range={range}
        eventOffset={15}
        disableSliceGroups={true}
        offsetCalculation={Month.offsetCalculation} 
        supportsFollow={false}
        max={dates.endOf(range.slice(-1), 'day')} 
      />
    );
  }
}

Month.navigate = (date, action) => {

  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'month');

    case navigate.NEXT:
      return dates.add(date, 1, 'month')

    default:
      return date;
  }
}

Month.range = (date, { culture, moment }) => {

  let firstOfWeek;

  if (moment) {
    firstOfWeek = moment(date).startOf('week');
  }
  else {
    firstOfWeek = localizer.startOfWeek(culture);
  }
/*
  let start = dates.startOf(date, 'month', firstOfWeek);
  let end = dates.endOf(date, 'month', firstOfWeek);
*/

  let start = dates.startOf(date, 'day', firstOfWeek);
  let end = dates.add(start, 1, 'month');

  return dates.range(start, end)
}

Month.title = (date, { formats, culture }) => {
/*
  let [start, ...rest] = Month.range(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );
  */

  let [start, ...rest] = Month.range(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );

}

Month.timeScaleValues = (date) => {

  let scale = [];
  let key = 0;

//  for (let i=0; i<Month.range(date).length; i++) {
  for (let i=0; i<16; i++) {

    let scaleDate = dates.add(date, i*2, 'day');

    scale.push({
      label: moment(scaleDate).format("Do"),
      key: key++,
      date: scaleDate
    });

  }
  /*
  for (let i=0; i<3; i++) {

    let scaleDate = dates.add(date, i, 'month');

    scale.push({
      label: moment(scaleDate).format("MMM"),
      key: key++,
    });

  }
  */
  return scale;

} 

Month.offsetCalculation = (date, follow) => {

  return 0;

}
export default Month
