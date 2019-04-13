//Importing all smaller React Components
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

//App Component to render all other React components and attach to div tag on html file
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    };
  }

  componentDidMount() {
    //Connecting to the websocket server to receive data from it
    this.socket = new WebSocket('ws://localhost:3001');

    //Upon connection with websocket server, print connected to server
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };

    //Upon receiving a message from websocket server (user message, notification or online user info)
    this.socket.onmessage = (event) => {
      const parsedMessageFromServer = JSON.parse(event.data);
      let messageObjectToAdd = {};

      //Behaviour for user message data from websocker server
      if (parsedMessageFromServer.type === 'incomingMessage') {
        messageObjectToAdd = {
          type: parsedMessageFromServer.type,
          id: parsedMessageFromServer.id,
          username: parsedMessageFromServer.username,
          content: parsedMessageFromServer.content
        };

        this.addMessage(messageObjectToAdd);

      //Behaviour for notification data from websocket server
      } else if (parsedMessageFromServer.type === 'incomingNotification') {
        messageObjectToAdd = {
          type: parsedMessageFromServer.type,
          id: parsedMessageFromServer.id,
          oldUsername: parsedMessageFromServer.oldUsername,
          newUsername: parsedMessageFromServer.newUsername
        };

        this.addMessage(messageObjectToAdd);
        this.setState({currentUser: {name:parsedMessageFromServer.newUsername}});

      // Behaviour for online user data from websocket server
      } else {
        this.setState({onlineUsers: parsedMessageFromServer.onlineUsers});
      }
    };
  }

  //Add User message or Notification data to messages object for display on page through MessageList component
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
