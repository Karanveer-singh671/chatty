// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'loçcalhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
}

function userOnline() {
  broadcast({
      type: 'userCount',
      userCount: wss.clients.size
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  ws.on('message', function incoming (message){
   const parsedMessage = JSON.parse(message);
   parsedMessage.id = uuidv1();
   broadcast(parsedMessage);
    })
  console.log('client connected')  
  userOnline();
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
console.log('client disconnected')
userOnline();
  })
})