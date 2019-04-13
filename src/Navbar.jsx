import React, {Component} from 'react';

export default class NavBar extends Component {
  displayUserWord = () => {
    let users = '';
    if (this.props.onlineUsers === 1) {
      users = 'User';
    } else {
      users = 'Users';
    }

    return users;
  }

  render() {
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">{this.props.onlineUsers} {this.displayUserWord()} Online</span>
        </nav>
    );
  }
}