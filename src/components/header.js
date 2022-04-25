import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
      minCount: '',
      secCount: '',
    };
  }

  onLabelChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    const { onItemAdded } = this.props;
    const { label, minCount, secCount } = this.state;
    if (minCount || secCount)
      if (e.key === 'Enter') {
        const minCountValue = +minCount;
        const secCountValue = +secCount;
        if (Number.isInteger(minCountValue) && Number.isInteger(minCountValue)) {
          onItemAdded(label, minCountValue, secCountValue);

          this.setState({ label: '', minCount: '', secCount: '' });
          // eslint-disable-next-line no-alert
        } else alert('Вы неверно указали время выполнения задания');
      }
  };

  render() {
    const { label, minCount, secCount } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="header new-todo-form" onKeyPress={this.onSubmit}>
        <h1 className="title">todos</h1>
        <input
          type="text"
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name="minCount"
          onChange={this.onLabelChange}
          value={minCount}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name="secCount"
          onChange={this.onLabelChange}
          value={secCount}
        />
      </form>
    );
  }
}

Header.defaultProps = {
  onItemAdded: () => {},
};

Header.propTypes = {
  onItemAdded: PropTypes.func,
};
