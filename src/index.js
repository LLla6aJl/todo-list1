/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/header';
import TodoList from './components/todo-list';
import Footer from './components/footer';

import './index.css';

export const UserContext = React.createContext(null);
export default function App() {
  const createTodoItem = (label, minCount, secCount) => {
    const id = Date.now() + Math.floor(Math.random() * 10000);
    // eslint-disable-next-line no-return-assign
    return {
      label,
      done: false,
      id,
      date: new Date(),
      timeToSolve: minCount * 60 + secCount,
    };
  };

  const [todoData, setData] = useState([
    createTodoItem('Completed task', 2, 30),
    createTodoItem('Editing task', 2, 10),
    createTodoItem('Active task', 2, 35),
  ]);
  const [filter, setFilter] = useState('all');

  const filtered = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const deleteItem = (id) => {
    setData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const addItem = (label, minCount, secCount) => {
    const item = label.replace(/ +/g, ' ').trim();
    if (item === '') return;
    const newItem = createTodoItem(item, minCount, secCount);

    setData((todoData) => {
      const newarr = [...todoData, newItem];
      return newarr;
    });
  };

  const onToggleDone = (id) => {
    setData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const onClearCompleted = () => {
    setData((todoData) => {
      const myarray = todoData.filter((el) => !el.done);
      return myarray;
    });
  };

  const visibleItems = filtered(todoData, filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  const contextValue = {
    visibleItems,
    onToggleDone,
    deleteItem,
    addItem,
    onFilterChange,
    onClearCompleted,
    todoCount,
    filter,
  };
  return (
    <section className="todoapp">
      <UserContext.Provider value={contextValue}>
        <Header />
        <section className="main">
          <TodoList />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={onFilterChange}
            onClearCompleted={onClearCompleted}
          />
        </section>
      </UserContext.Provider>
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
