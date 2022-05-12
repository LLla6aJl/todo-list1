// import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '..';

export default function Filters() {
  const value = React.useContext(UserContext);

  const { onFilterChange, filter } = value;

  const buttonsArray = [
    { name: 'all', label: 'all' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'done' },
  ];

  const buttons = buttonsArray.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
}
