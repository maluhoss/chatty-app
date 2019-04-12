import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {

  render() {
    let messages = this.props.messages;

    let modifiedMessages = messages.map(function(message) {
      if (message.type === 'incomingMessage') {
        return (<Message username={message.username} content={message.content} key={message.id}/>)
      } else {
        return (
          <div key={message.id} className="notification">
           <span className="notification-content">{message.oldUsername} changed their name to {message.newUsername}.</span>
          </div>
        );
      }
    })

    return (
      <main className="messages">
       {modifiedMessages}
      </main>
    );
  }
}