import React, {Component} from 'react';

//Notification React component to display username change notification
export default class Notification extends Component {
  notificationDisplay = () => {
    if (this.props.type === 'incomingNotification') {
      return `${this.props.oldUsername} changed their name to ${this.props.newUsername}`;
    } else if (this.props.type === 'userjoined') {
      return `${this.props.user} has joined`;
    } else if (this.props.type === 'userleft') {
      return `A user has left`;
    }
  }

  render() {
    return (
      <div key={this.props.id} className='notification'>
        <span className='notification-content'>{this.notificationDisplay()}</span>
      </div>
    );
  }
}