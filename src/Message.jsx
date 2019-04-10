import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </React.Fragment>
    );
  }
}