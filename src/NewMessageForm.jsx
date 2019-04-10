import React, {Component} from 'react';

export default class NewMessage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </React.Fragment>
    );
  }
}