import React, {Component} from 'react';

//Message React Component to display new user message
export default class Message extends Component {
  render() {
    return (
      <div key={this.props.key} className='message'>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}