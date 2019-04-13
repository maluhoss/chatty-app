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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  function broadcast(clientObject) {
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(clientObject));
      }
    });
  }

  const onlineUsersObject = {
            id: uuid(),
            type: 'clientcount',
            onlineUsers: wss.clients.size
          };

  broadcast(onlineUsersObject);

  ws.on('message', function incoming(data) {
    const parsedClientMessage = JSON.parse(data);
    let messageFromServer = {};

    if(parsedClientMessage.type === 'postMessage'){
      console.log(`User ${parsedClientMessage.username} said ${parsedClientMessage.content}`);

      messageFromServer = {
          type: 'incomingMessage',
          id: uuid(),
          username: parsedClientMessage.username,
          content: parsedClientMessage.content
        };

      broadcast(messageFromServer);
    } else {
      messageFromServer = {
          type: 'incomingNotification',
          id: uuid(),
          oldUsername: parsedClientMessage.oldUsername,
          newUsername: parsedClientMessage.newUsername
        };

      broadcast(messageFromServer);
    }
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    broadcast(onlineUsersObject);
  });
});