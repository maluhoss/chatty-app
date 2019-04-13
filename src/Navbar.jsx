import React, {Component} from 'react';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.props.onlineUsers} Users Online</span>
        </nav>
    );
  }
}