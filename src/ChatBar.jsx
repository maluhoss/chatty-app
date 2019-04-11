import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: this.props.user}
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange = (event) => {
    const newUsername = event.target.value;
    this.setState({currentUser: {name: newUsername}});
  }

  onBlur = (event) => {
    const usernameObj = {
      type: 'notification',
      oldUsername: this.props.user.name,
      newUsername: this.state.currentUser.name
    }

    this.props.socket.send(JSON.stringify(usernameObj));
  }

  onKeyPress(event) {

      if(event.key === 'Enter') {
        const input = event.target;
        const usernameInput = this.refs.username;

        this.props.socket.send(JSON.stringify({
          type: "sendMessage",
          content: input.value,
          username: usernameInput.value
        }));

        input.value = '';

      }
    }

  render() {
    return (
      <footer className="chatbar">
        <input ref="username" onChange={this.onChange} onBlur={this.onBlur} className="chatbar-username" placeholder="Type your Name" value={this.state.currentUser.name} />
        <input ref="message" onKeyPress={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
