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
    let nextDate = dates.add(date, 3, 'month');
    let range = [...Month3.range(date, this.props),] 
    //              ...Month3.range(nextDate, this.props)]

    return (
      <TimeGrid 
        {...props}
        range={range}
        eventOffset={15}
        disableSliceGroups={true} 
        offsetCalculation={Month3.offsetCalculation} 
        supportsFollow={false}
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

  //FIXME

  let firstOfWeek = localizer.startOfWeek(culture)

  let start = dates.startOf(date, 'month', firstOfWeek)
  let end = dates.endOf(dates.add(date, 2, 'month'), 'month', firstOfWeek)

  return dates.range(start, end)
}

//FIXME only month
Month3.title = (date, { formats, culture }) =>
  localizer.format(date, formats.monthHeaderFormat, culture);
/*
Month3.title = (date, { formats, culture }) => {

  let [start, ...rest] = Month3.range(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );
}
*/

//FIXME divisions ignored
Month3.timeScaleValues = (date, divisions) => {

  let scale = [];
  let key = 0;

  //FIXME hardcoded 
  for (let i=0; i<14; i++) {

    let scaleDate = dates.add(date, i, 'day');

    scale.push({
      label: moment(scaleDate).format("ddd Do"),
      key: key++,
    });

  }
  return scale;

} 

Month3.offsetCalculation = (date, follow) => {

  return 0;

}
export default Month3
