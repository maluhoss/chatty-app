import React, {Component} from 'react';

export default class Notification extends Component {
  render() {
    return (<div key={this.props.key} className="notification">
            <span className="notification-content">{this.props.oldUsername} changed their name to {this.props.newUsername}</span>
         </div>);
  }
}