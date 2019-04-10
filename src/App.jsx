import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }]
      };
    this.createMessage = this.createMessage.bind(this);
  }

  createMessage(message) {
    const oldMessageList = this.state.messages;
    const newMessageList = [...oldMessageList, message];
    this.setState({messages: newMessageList});
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList/>
        <ChatBar user={this.state.currentUser} />
      </React.Fragment>
    );
  }
}
