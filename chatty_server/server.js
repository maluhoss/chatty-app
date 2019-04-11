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
  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);

    if(parsedData.type === 'sendMessage'){
      console.log(`User ${parsedData.username} said ${parsedData.content}`);

      const messageFromServer = {
          type: 'sendMessage',
          id: uuid(),
          username: parsedData.username,
          content: parsedData.content
        }

      wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageFromServer));
        }
      })
    } else {
      // console.log(parsedData);
      parsedData["id"] = uuid();

      wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      })

    };
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});