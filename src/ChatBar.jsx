import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {

      if(event.key === 'Enter') {
        const input = event.target;
        const usernameInput = this.refs.username;

        // this.props.createMessage(
        //   {id: Date.now(),
        //   username: usernameInput.value,
        //   content: input.value
        // });

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
        <input ref="username" className="chatbar-username" placeholder="Type your Name" defaultValue={this.props.user.name} />
        <input ref="message" onKeyPress={this.onKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
