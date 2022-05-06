import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '..';

export default function Header() {
  const value = React.useContext(UserContext);
  const { addItem } = value;

  const [label, setLabel] = useState('');
  const [minCount, setMin] = useState('');
  const [secCount, setSec] = useState('');

  // onLabelChange = (event) => {
  //   setData({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const onSubmit = (e) => {
    console.log(e);
    if (minCount || secCount)
      if (e.key === 'Enter') {
        const minCountValue = +minCount;
        const secCountValue = +secCount;
        if (Number.isInteger(minCountValue) && Number.isInteger(minCountValue)) {
          addItem(label, minCountValue, secCountValue);
          setLabel('');
          setMin('');
          setSec('');
          // eslint-disable-next-line no-alert
        } else alert('Вы неверно указали время выполнения задания');
      }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="header new-todo-form" onKeyPress={(e) => onSubmit(e)}>
      <h1 className="title">todos</h1>
      <input
        type="text"
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        onChange={(event) => {
          setLabel(event.target.value);
        }}
        value={label}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        name="minCount"
        onChange={(event) => {
          setMin(event.target.value);
        }}
        value={minCount}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        name="secCount"
        onChange={(event) => {
          setSec(event.target.value);
        }}
        value={secCount}
      />
    </form>
  );
}

Header.defaultProps = {
  onItemAdded: () => {},
};

// Header.propTypes = {
//   onItemAdded: PropTypes.func,
// };
