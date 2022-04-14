import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './task';

function TodoList({ todos, onDeleted, onToggleDone }) {
  const elements = todos.map((item) => {
    const { id, ...itemsProps } = item;

    return (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <TodoListItem {...itemsProps} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TodoList;

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};
