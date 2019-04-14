const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server. When client connects, print to console that client connected and send info about number of online users to all clients
wss.on('connection', (ws) => {
  console.log('Client connected');

  function broadcast(clientObject) {
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(clientObject));
      }
    });
  }

  let onlineUsersObject = {
    id: uuid(),
    type: 'clientcount',
    onlineUsers: wss.clients.size
  };

  broadcast(onlineUsersObject);

  //Behaviour when data (new user message or username change notification) received from client - send modified data object with unique id back to client
  ws.on('message', function incoming(data) {
    const parsedClientMessage = JSON.parse(data);
    let messageFromServer = {};

    //For new user message
    if(parsedClientMessage.type === 'postMessage'){
      console.log(`User ${parsedClientMessage.username} said ${parsedClientMessage.content}`);

      messageFromServer = {
        type: 'incomingMessage',
        id: uuid(),
        username: parsedClientMessage.username,
        content: parsedClientMessage.content
      };

      broadcast(messageFromServer);

      //For username change notification
    } else if (parsedClientMessage.type === 'postNotification') {
      messageFromServer = {
        type: 'incomingNotification',
        id: uuid(),
        oldUsername: parsedClientMessage.oldUsername,
        newUsername: parsedClientMessage.newUsername
      };

      broadcast(messageFromServer);
    } else if (parsedClientMessage.type === 'userjoined') {
      messageFromServer = {
        type: 'userjoined',
        id: uuid(),
        user: parsedClientMessage.user
      };

      broadcast(messageFromServer);
    }
  });


  // Set up a callback for when client closes the socket, print to console and send info about number of online users to all clients
  ws.on('close', () => {
    onlineUsersObject = {
      id: uuid(),
      type: 'clientcount',
      onlineUsers: wss.clients.size
    };

    const userLeft = {
      id: uuid(),
      type: 'userleft',
    };

    console.log('Client disconnected');
    broadcast(onlineUsersObject);
    broadcast(userLeft);
  });
});