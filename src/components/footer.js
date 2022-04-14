import PropTypes from 'prop-types';

import Filters from './filters';

function Footer({ toDo, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <Filters filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={() => onClearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
};
