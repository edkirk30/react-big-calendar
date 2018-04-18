import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';
import TimeGrid from './TimeGrid';

class Week extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = TimeGrid.defaultProps;

  render() {
    let { date, ...props } = this.props

    //let nextDate = dates.add(date, 1, 'week');
    //let range = Week.range(date, this.props)
    
    let range = [...Week.range(date, this.props)]
                 // ...Week.range(nextDate, this.props)]

    return (
      <TimeGrid 
        {...props}
        range={range}
        eventOffset={15}
        disableSliceGroups={true}
        offsetCalculation={Week.offsetCalculation}
        supportsFollow={false}
        max={dates.endOf(range.slice(-1), 'day')} 
      />
    );
  }
}

Week.navigate = (date, action) => {
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date;
  }
}

Week.range = (date, { culture }) => {

  let start = date;
  let end = dates.add(date, 6, 'day');

  return dates.range(start, end)
}

Week.title = (date, { formats, culture }) => {
  let [start, ...rest] = Week.range(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );
}

Week.timeScaleValues = (date) => {

  let scale = [];
  let key = 0;

  for (let i=0; i<7; i++) {

    let scaleDate = dates.add(date, i, 'day');

    scale.push({
      label: moment(scaleDate).format("ddd Do"),
      key: key++,
    });

  }

  return scale;

} 

Week.offsetCalculation = (date, follow) => {

  return 0;

}

Week.supportsFollow = true;


export default Week
