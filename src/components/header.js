import React, { Component } from 'react';
import './header.css';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onItemAdded } = this.props;
    const { label } = this.state;
    onItemAdded(label);
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1 className="title">todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
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
