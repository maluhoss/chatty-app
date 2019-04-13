import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: this.props.currentUser};
  }

  onChange = (event) => {
    const newUsername = event.target.value;
    this.setState({currentUser: {name: newUsername}});
  }

  onBlur = (event) => {
    const oldUsername = this.props.currentUser.name;
    const newUsername = this.state.currentUser.name;
    const usernameObj = {
      type: 'postNotification',
      oldUsername: oldUsername,
      newUsername: newUsername
    };

    this.props.socket.send(JSON.stringify(usernameObj));
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter') {
      const messageInput = event.target;
      const usernameInput = this.refs.username;
      const messageObj = {
        type: "postMessage",
        content: messageInput.value,
        username: usernameInput.value
      };

    this.props.socket.send(JSON.stringify(messageObj));
    messageInput.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input ref="username" onChange={this.onChange} onBlur={this.onBlur} className="chatbar-username" placeholder="Type your Name" value={this.state.currentUser.name} />
        <input onKeyPress={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
