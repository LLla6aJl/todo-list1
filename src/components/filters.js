// import PropTypes from 'prop-types';

export default function Filters(filter, onFilterChange) {
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

// Filters.defaultProps = {
//   filter: 'all',
//   onFilterChange: () => {},
// };

// Filters.propTypes = {
//   filter: PropTypes.string,
//   onFilterChange: PropTypes.func,
// };
