import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {

  render() {
    let messages = this.props.messages;

    let modifiedMessages = messages.map(function(message) {
      if (message.type === 'incomingMessage') {
        return (<Message key={message.id} username={message.username} content={message.content} />);
      } else if (message.type === 'incomingNotification') {
        return (<Notification key={message.id} oldUsername={message.oldUsername} newUsername={message.newUsername} />);
      }
    });

    return (
      <main className="messages">
       {modifiedMessages}
      </main>
    );
  }
}