import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class TodoListItem extends Component {
  render() {
    const { label, onDeleted, onToggleDone, done, date } = this.props;

    let classNames = '';
    let checked = false;

    const createdTime = formatDistanceToNow(date, { includeSeconds: true });
    if (done) {
      classNames += 'completed';
      checked = true;
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" readOnly id={label} type="checkbox" onClick={onToggleDone} checked={checked} />
          <label role="presentation" htmlFor={label} onClick={onToggleDone} onKeyUp={onToggleDone}>
            <span role="presentation" className="description" onClick={onToggleDone} onKeyUp={onToggleDone}>
              {label}
            </span>
            <span className="created">{createdTime}</span>
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
