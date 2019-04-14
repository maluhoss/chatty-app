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
      const userJoined = {
        type: 'userjoined',
        user: this.state.currentUser.name
      };
      this.socket.send(JSON.stringify(userJoined));
    };

    //Upon receiving a message from websocket server (user message, notification or online user info)
    this.socket.onmessage = (event) => {
      const parsedMessageFromServer = JSON.parse(event.data);

      //Behaviour for user message data from websocker server
      if (parsedMessageFromServer.type === 'incomingMessage') {
        this.addMessage(parsedMessageFromServer);

      //Behaviour for notification data from websocket server
      } else if (parsedMessageFromServer.type === 'incomingNotification') {
        this.addMessage(parsedMessageFromServer);
        this.setState({currentUser: {name:parsedMessageFromServer.newUsername}});

      // Behaviour for online user data from websocket server
      } else if (parsedMessageFromServer.type === 'clientcount') {
        this.setState({onlineUsers: parsedMessageFromServer.onlineUsers});

      //Behaviour for when new user joined
      } else if (parsedMessageFromServer.type === 'userjoined') {
        this.addMessage(parsedMessageFromServer);

      //Behaviour for when user disconnected from websocket server
      } else {
        this.addMessage(parsedMessageFromServer);
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
