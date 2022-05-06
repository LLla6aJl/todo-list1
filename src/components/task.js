/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';

import { UserContext } from '..';

export default function TodoListItem(props) {
  const value = React.useContext(UserContext);

  const { deleteItem, onToggleDone } = value;
  const { id, label, done, date, timeToSolve } = props;

  const [timeToSolved, setTimeToSolve] = useState(timeToSolve);
  const [timeGo, setTimeGo] = useState(false);
  let counterID;
  // componentWillUnmount() {
  //   clearInterval(this.counterID);
  // }

  const secDecrement = () => {
    // const { timeToSolve, timeGo } = this.state;
    if (timeToSolved === 0 && timeGo === true) {
      clearInterval(counterID);
      setTimeGo(false);
    }
    if (timeToSolved > 0) {
      setTimeToSolve((time) => time - 1);
      setTimeGo(true);
    }
  };

  const handlePause = (event) => {
    event.stopPropagation();
    setTimeGo(false);
    clearInterval(counterID);
  };

  const handleStart = (event) => {
    event.stopPropagation();
    setTimeGo(true);
    counterID = setInterval(() => {
      secDecrement();
    }, 1000);
  };

  const buttonTimer = !timeGo ? (
    /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
    <button type="button" className="icon icon-play" onClick={handleStart} />
  ) : (
    /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
    <button type="button" className="icon icon-pause" onClick={handlePause} />
  );

  let classNames = '';
  let checked = false;
  if (done) {
    classNames += 'completed';
    checked = true;
    setTimeToSolve(0);
    clearInterval(counterID);
  }
  // const createdTime = formatDistanceToNow(date, { includeSeconds: true });

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          readOnly
          id={id}
          type="checkbox"
          onClick={() => {
            onToggleDone(id);
          }}
          checked={checked}
        />
        <label
          role="presentation"
          htmlFor={label}
          // onClick={(id) => onToggleDone(id)}
          // onKeyUp={(id) => onToggleDone(id)}
        >
          <span
            role="presentation"
            className="title"
            // onClick={(id) => onToggleDone(id)}
            // onKeyUp={(id) => onToggleDone(id)}
          >
            {label}
          </span>
          <span className="description">{/* {buttonTimer} {format(timeToSolve * 1000, 'mm:ss')} */}</span>
          {/* <span className="description"> created {createdTime} ago</span> */}
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={deleteItem} aria-label="log out" />
      </div>
    </li>
  );
}

// TodoListItem.defaultProps = {
//   label: 'default task',
//   onDeleted: () => {},
//   onToggleDone: () => {},
//   done: true,
// };

// TodoListItem.propTypes = {
//   label: PropTypes.string,
//   onDeleted: PropTypes.func,
//   onToggleDone: PropTypes.func,
//   done: PropTypes.bool,
// };
