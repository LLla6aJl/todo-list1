import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filters extends Component {
  buttons = [
    { name: 'all', label: 'all' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
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
}

Filters.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

Filters.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
