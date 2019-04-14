import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

//MessageList React component to display both messages and notifications on all clients' webpages. Includes Message and Notification React component
export default class MessageList extends Component {
  render() {
    let messages = this.props.messages;

    let modifiedMessages = messages.map(function(message) {
      //Render for incoming new user message
      if (message.type === 'incomingMessage') {
        return (<Message key={message.id} id={message.id} username={message.username} content={message.content} />);
      //Render for incoming new notification about username change
      } else if (message.type === 'incomingNotification') {
        return (<Notification key={message.id} id={message.id} type={message.type} oldUsername={message.oldUsername} newUsername={message.newUsername} />);
      //Render for new user
      } else if (message.type === 'userjoined') {
        return (<Notification key={message.id} id={message.id} type={message.type} user={message.user} />);
      //Render when user left
      } else {
        return (<Notification key={message.id} id={message.id} type={message.type} />);
      }
    });

    return (
      <main className='messages'>
        {modifiedMessages}
      </main>
    );
  }
}