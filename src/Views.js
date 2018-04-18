import { views } from './utils/constants';
import Month3 from './Month3';
import Month from './Month';
import Day from './Day';
import Week from './Week';
import WorkWeek from './WorkWeek';
import Agenda from './Agenda';

const VIEWS = {
  [views.MONTH3]: Month3,
  [views.MONTH]: Month,
  [views.WEEK]: Week,
  [views.WORK_WEEK]: WorkWeek,
  [views.DAY]: Day,
  [views.AGENDA]: Agenda
};

export default VIEWS;
