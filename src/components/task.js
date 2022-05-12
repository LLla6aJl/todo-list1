/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';

import { UserContext } from '..';

export default function TodoListItem(props) {
  const value = React.useContext(UserContext);

  const { onToggleDone, deleteItem } = value;
  const { id, label, done, date, timeToSolve } = props;

  const [timeToSolved, setTimeToSolve] = useState(timeToSolve);
  const [timeGo, setTimeGo] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  let updateTimeToSolved = timeToSolve;

  const secDecrement = (newIntervalId) => {
    if (updateTimeToSolved === 0) {
      clearInterval(newIntervalId);
      setTimeGo(false);
      return;
    }
    if (updateTimeToSolved > 0) {
      updateTimeToSolved -= 1;
      setTimeToSolve(updateTimeToSolved);
    }
  };

  const handlePause = (event) => {
    event.stopPropagation();
    setTimeGo(false);
    clearInterval(intervalId);
  };

  const handleStart = (event) => {
    event.stopPropagation();
    setTimeGo(true);
    const newIntervalId = setInterval(() => {
      secDecrement(newIntervalId);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  useEffect(
    () => () => {
      clearInterval(intervalId);
    },
    [timeToSolve, intervalId]
  );

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
    // setTimeToSolve(0);
    // clearInterval(counterID);
  }
  const createdTime = formatDistanceToNow(date, { includeSeconds: true });

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          readOnly
          type="checkbox"
          onClick={() => {
            onToggleDone(id);
          }}
          checked={checked}
        />
        <label role="presentation" htmlFor={label} onClick={() => onToggleDone(id)} onKeyUp={() => onToggleDone(id)}>
          <span role="presentation" className="title" onClick={() => onToggleDone(id)} onKeyUp={() => onToggleDone(id)}>
            {label}
          </span>
          <span className="description">
            {buttonTimer} {format(timeToSolved * 1000, 'mm:ss')}
          </span>
          <span className="description"> created {createdTime} ago</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={() => deleteItem(id)} aria-label="log out" />
      </div>
    </li>
  );
}
