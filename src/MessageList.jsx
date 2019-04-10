import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    let messages = this.props.messages;

    let modifiedMessages = messages.map(function(message) {
      return <Message username={message.username} content={message.content} key={message.id}/>
    })

    return (
      <main className="messages">
        {modifiedMessages}
      </main>
    );
  }
}