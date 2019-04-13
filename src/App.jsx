import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
       messages: []
      };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = function (event) {
    console.log("Connected to server");
  }

  this.socket.onmessage = (event) => {
    const parsedMessageFromServer = JSON.parse(event.data);

    if (parsedMessageFromServer.type === 'incomingMessage') {
      this.addMessage(
        {
        type: parsedMessageFromServer.type,
        id: parsedMessageFromServer.id,
        username: parsedMessageFromServer.username,
        content: parsedMessageFromServer.content
      });
    } else if (parsedMessageFromServer.type === 'incomingNotification') {
      this.addMessage({
        type: parsedMessageFromServer.type,
        id: parsedMessageFromServer.id,
        oldUsername: parsedMessageFromServer.oldUsername,
        newUsername: parsedMessageFromServer.newUsername
      });
      this.setState({currentUser: {name:parsedMessageFromServer.newUsername}})
    } else {
      this.setState({onlineUsers: parsedMessageFromServer.onlineUsers});
    }
  };

  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {type: 'incomingMessage', id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  addMessage = (message) => {
    const oldMessageList = this.state.messages;
    const newMessageList = [...oldMessageList, message];
    this.setState({messages: newMessageList});
  }

  render() {
    return (
      <React.Fragment>
        <NavBar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} socket={this.socket} />
      </React.Fragment>
    );
  }
}
