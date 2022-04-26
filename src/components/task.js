import React, { Component } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import PropTypes from 'prop-types';

export default class TodoListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    timeToSolve: this.props.timeToSolve,
    timeGo: false,
  };

  componentWillUnmount() {
    clearInterval(this.counterID);
  }

  secDecrement = () => {
    const { timeToSolve, timeGo } = this.state;
    if (timeToSolve === 0 && timeGo === true) {
      clearInterval(this.counterID);
      this.setState({
        timeGo: false,
      });
    }
    if (timeToSolve > 0) {
      this.setState({
        timeToSolve: timeToSolve - 1,
        timeGo: true,
      });
    }
  };

  handlePause = (event) => {
    event.stopPropagation();
    this.setState({ timeGo: false });
    clearInterval(this.counterID);
  };

  handleStart = (event) => {
    event.stopPropagation();
    this.setState({ timeGo: true });
    this.counterID = setInterval(() => {
      this.secDecrement();
    }, 1000);
  };

  render() {
    const { label, onDeleted, onToggleDone, done, date } = this.props;

    // eslint-disable-next-line prefer-const
    let { timeToSolve, timeGo } = this.state;

    const buttonTimer = !timeGo ? (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className="icon icon-play" onClick={this.handleStart} />
    ) : (
      /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
    );

    let classNames = '';
    let checked = false;

    const createdTime = formatDistanceToNow(date, { includeSeconds: true });
    if (done) {
      classNames += 'completed';
      checked = true;
      timeToSolve = 0;
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" readOnly id={label} type="checkbox" onClick={onToggleDone} checked={checked} />
          <label role="presentation" htmlFor={label} onClick={onToggleDone} onKeyUp={onToggleDone}>
            <span role="presentation" className="title" onClick={onToggleDone} onKeyUp={onToggleDone}>
              {label}
            </span>
            <span className="description">
              {buttonTimer} {format(timeToSolve * 1000, 'mm:ss')}
            </span>
            <span className="description"> created {createdTime} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.onItemEdit} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="log out" />
        </div>
      </li>
    );
  }
}

TodoListItem.defaultProps = {
  label: 'default task',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: true,
};

TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
};
