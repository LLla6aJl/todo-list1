import React from 'react';

// eslint-disable-next-line import/no-cycle
import { UserContext } from '..';

import TodoListItem from './task';

function TodoList() {
  const value = React.useContext(UserContext);
  const { visibleItems } = value;
  // eslint-disable-next-line react/jsx-props-no-spreading
  const elements = visibleItems.map((item) => <TodoListItem key={item.id} {...item} />);

  return <ul className="todo-list">{elements}</ul>;
}

export default TodoList;

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};

// TodoList.propTypes = {
//   onDeleted: PropTypes.func,
//   onToggleDone: PropTypes.func,
// };
