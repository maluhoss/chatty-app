import React, {Component} from 'react';

//Notification React component to display username change notification
export default class Notification extends Component {
  render() {
    return (
      <div key={this.props.key} className='notification'>
        <span className='notification-content'>{this.props.oldUsername} changed their name to {this.props.newUsername}</span>
      </div>
    );
  }
}