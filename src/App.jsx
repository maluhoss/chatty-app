import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList/>
        <ChatBar/>
      </React.Fragment>
    );
  }
}
