import React from 'react';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '..';

// eslint-disable-next-line import/no-cycle
import Filters from './filters';

function Footer() {
  const value = React.useContext(UserContext);
  const { todoCount, filter, onClearCompleted } = value;
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <Filters filter={filter} />
      <button type="button" className="clear-completed" onClick={() => onClearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
