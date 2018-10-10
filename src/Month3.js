import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';
import TimeGrid from './TimeGrid';

class Month3 extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = TimeGrid.defaultProps;

  render() {
    let { date, ...props } = this.props
    let range = [...Month3.range(date, this.props),] 

    return (
      <TimeGrid 
        {...props}
        range={range}
        eventOffset={15}
        disableSliceGroups={true} 
        offsetCalculation={Month3.offsetCalculation} 
        supportsFollow={false}
        max={dates.endOf(range.slice(-1), 'day')} 
      />
    );
  }
}

Month3.navigate = (date, action) => {

  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -3, 'month');

    case navigate.NEXT:
      return dates.add(date, 3, 'month')

    default:
      return date;
  }
}

Month3.range = (date, { culture }) => {

  let firstOfWeek = localizer.startOfWeek(culture)

  let start = dates.startOf(date, 'day', firstOfWeek)
  let end = dates.endOf(dates.add(date, 3, 'month'), 'day', firstOfWeek)

  return dates.range(start, end)
}

Month3.title = (date, { formats, culture }) => {

  let [start, ...rest] = Month3.range(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );
}

Month3.timeScaleValues = (date) => {

  let scale = [];
  let key = 0;

  for (let i=0; i<3; i++) {

    let scaleDate = dates.add(date, i, 'month');

    scale.push({
      label: moment(scaleDate).format("MMM"),
      key: key++,
      date: scaleDate
    });

  }
  return scale;

} 

Month3.offsetCalculation = (date, follow) => {

  return 0;

}
export default Month3
