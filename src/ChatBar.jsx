import React, {Component} from 'react';

//ChatBar component at bottom of webpage where user types name and message in and it will show on all clients' webpages
export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: this.props.currentUser};
  }

  //Event listener for user input React element to detect when text changes. New Username will be in this React component's state
  onChange = (event) => {
    const newUsername = event.target.value;
    this.setState({currentUser: {name: newUsername}});
  }

  //Event listener for user input React element to send information to websocket server containing information about name change, so server can send information back and show up as notification on all clients' webpage
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

  //Event listener for user message input React element to send information to websocket server containing information about new user message, so server can send information back and show up as new user message on all clients' webpage
  onKeyPress = (event) => {
    if(event.key === 'Enter') {
      const messageInput = event.target;
      const usernameInput = this.refs.username;
      const messageObj = {
        type: 'postMessage',
        content: messageInput.value,
        username: usernameInput.value
      };

      this.props.socket.send(JSON.stringify(messageObj));
      messageInput.value = '';
    }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input ref='username' onChange={this.onChange} onBlur={this.onBlur} className='chatbar-username' placeholder='Type your Name' value={this.state.currentUser.name} />
        <input onKeyPress={this.onKeyPress} className='chatbar-message' placeholder='Type a message and hit ENTER' />
      </footer>
    );
  }
}
