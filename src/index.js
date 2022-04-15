import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import Header from './components/header';
import TodoList from './components/todo-list';
import Footer from './components/footer';

import './index.css';

export default class App extends Component {
  maxId = 100;

  constructor(props) {
    super(props);

    this.state = {
      todoData: [
        this.createTodoItem('Completed task'),
        this.createTodoItem('Editing task'),
        this.createTodoItem('Active task'),
      ],
      filter: 'all',
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    this.filtered = (items, filter) => {
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
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const item = text.replace(/ +/g, ' ').trim();
    if (item === '') return;
    const newItem = this.createTodoItem(item);

    this.setState(({ todoData }) => {
      const myarray = [...todoData, newItem];
      return {
        todoData: myarray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const myarray = todoData.filter((el) => !el.done);
      return {
        todoData: myarray,
      };
    });
  };

  createTodoItem(label) {
    this.maxId += 1;
    return {
      label,
      done: false,
      id: this.maxId,
      date: new Date(),
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filtered(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
