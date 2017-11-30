// server.js
const uuidv1 = require('uuid/v1');

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const clients = [];
let counter = 0;



//   // Broadcast to all.
// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//       client.send(JSON.stringify(data);
      
//   });
// };
  

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  clients.push(ws);
  counter++;
  //console.log(counter + 'user entered');
  ws.on('message', function incoming(message) {
    
    const msg = JSON.parse(message); 
    msg.id = uuidv1();
    
    wss.clients.forEach((client) => {
    if (client.readyState == ws.OPEN) {
      client.send(JSON.stringify(msg));
      client.send(counter)
    }
  });
})
  console.log(counter + 'before closing should be same as above')
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
  counter--
  console.log('Client disconnected');

  //console.log(counter + 'user exit');
});
})