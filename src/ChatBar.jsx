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

        this.props.createMessage(
          {id: Date.now(),
          username: usernameInput.value,
          content: input.value
        });

        input.value = '';
      }
    }

  render() {
    return (
      <footer className="chatbar">
        <input ref="username" className="chatbar-username" name="username" defaultValue={this.props.user.name} />
        <input ref="message" onKeyPress={this.onKeyPress} className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
