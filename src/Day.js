import PropTypes from 'prop-types';
import React from 'react';

import dates from './utils/dates';
import { navigate } from './utils/constants';
import TimeGrid from './TimeGrid';
import localizer  from './localizer';

class Day extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    let { date, ...props } = this.props;

    let range = [dates.startOf(date, 'day')]

    if (dates.isToday(date)) {
      range = [...range, dates.startOf(dates.add(date, 1, 'day'), 'day')];
    }

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={11}
        disableSlices={true} 
        offsetCalculation={Day.offsetCalculation} 
        supportsFollow={Day.supportsFollow}
        />
    );
  }
}

Day.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}


Day.title = (date, { formats, culture }) =>
  localizer.format(date, formats.dayHeaderFormat, culture);

Day.timeScaleValues = (date, today=false, follow=false) => {

  let days = today ? 2 : 1;
  let key = 0;
  let scale = [];

  for (let i=0; i<days; i++) { 
    for (let j=0; j<24; j++) {
      scale.push({label: String(j) + ':00',
                  key: key++});  
    }
  }

  return scale;

} 

Day.offsetCalculation = (date, follow) => {

  if (follow) {
    return -dates.currentTimeOffset(date) + '%';
  }

  return 0;

}

Day.supportsFollow = true;

export default Day
