// const ws = new require("ws");
// const wsServer = new ws.Server({ port: 5000 });
// const clients = [];
// wsServer.on("connection", (newClient) => {
//   clients.push(newClient);
//   newClient.on("message", (data) => {
//     const message = JSON.parse(data);

//     clients.forEach((client) => {
//       if (client !== newClient) {
//         client.send(JSON.stringify(message));
//       }
//     });
//   });
// });

// websoccet new chat
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  console.log("http");
});

server.listen(8080, () => {
  console.log("Server is on 8080");
});

const ws = new WebSocket.WebSocketServer({ server });

ws.on("connection", (connection, req) => {
  const address = req.socket.remoteAddress;
  console.log(`New client is here: ${address} `);

  connection.on("message", (data) => {
    console.log("clients", ws.clients.size);

    for (const client of ws.clients) {
      if (client !== connection) {
        client.send(data, { binary: false });
      }
    }
  });

  connection.on("close", () => {
    console.log("client  disconnected");
  });
});
