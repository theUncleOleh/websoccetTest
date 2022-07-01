const ws = new require("ws");
const wsServer = new ws.Server({ port: 5000 });
const clients = [];
wsServer.on("connection", (newClient) => {
  clients.push(newClient);
  newClient.on("message", (data) => {
    const message = JSON.parse(data);

    clients.forEach((client) => {
      if (client !== newClient) {
        client.send(JSON.stringify(message));
      }
    });
  });
});
