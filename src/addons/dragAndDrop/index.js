import PropTypes from 'prop-types';
import React from 'react'
import { DragDropContext } from 'react-dnd'
import cn from 'classnames';

import { accessor } from '../../utils/propTypes';
import DraggableEventWrapper from './DraggableEventWrapper'
import { DayWrapper, DayColumnWrapper, DateCellWrapper } from './backgroundWrapper'

let html5Backend;

try {
  html5Backend = require('react-dnd-html5-backend')
} catch (err) { /* optional dep missing */}

export default function withDragAndDrop(Calendar, {
  backend = html5Backend
} = {}) {

  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
      components: PropTypes.object,
    }
    getChildContext () {
      return {
        step: this.props.steps[this.props.view],
        matchOriginalTimes: this.props.matchOriginalTimes[this.props.view],
        onEventDrop: this.props.onEventDrop,
        startAccessor: this.props.startAccessor,
        endAccessor: this.props.endAccessor
      }
    }

    constructor(...args) {
      super(...args);
      this.state = { isDragging: false };
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor()
      this.monitor = monitor
      this.unsubscribeToStateChange = monitor
        .subscribeToStateChange(this.handleStateChange)
    }

    componentWillUnmount() {
      this.monitor = null
      this.unsubscribeToStateChange()
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem();

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }));
      }
    }

    render() {
      const { selectable, components, ...props } = this.props;

      delete props.onEventDrop;

      props.selectable = selectable
        ? 'ignoreEvents' : false;

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        this.state.isDragging && 'rbc-addons-dnd-is-dragging'
      )

      props.components = {
        ...components,
        eventWrapper: DraggableEventWrapper,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper,
        dayColumnWrapper: DayColumnWrapper,
      }

      return <Calendar {...props} />
    }
  }

  DragAndDropCalendar.propTypes = {
    step: PropTypes.number,
    onEventDrop: PropTypes.func.isRequired,
    startAccessor: accessor,
    endAccessor: accessor
  }

  DragAndDropCalendar.defaultProps = {
    startAccessor: 'start',
    endAccessor: 'end'
  };

  DragAndDropCalendar.contextTypes = {
    dragDropManager: PropTypes.object
  }

  DragAndDropCalendar.childContextTypes = {
    step: PropTypes.number,
    matchOriginalTimes: PropTypes.bool,
    onEventDrop: PropTypes.func,
    startAccessor: accessor,
    endAccessor: accessor
  }

  if (backend === false) {
    return DragAndDropCalendar;
  } else {
    return DragDropContext(backend)(DragAndDropCalendar);
  }
}
