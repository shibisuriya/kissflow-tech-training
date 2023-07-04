const websocket = require("ws");

const wss = new websocket.WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("Connection established!");

  ws.on("error", () => {
    console.log("Error!");
  });

  ws.on("message", (data) => {
    console.log("Recieved a message in server!");
    // Send the message recieved from the browser back to the browser :)
    console.log(data.toString());

    const obj = JSON.parse(data.toString());

    // Attach server's date / time to the payload and forward.
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    obj["time"] = currentDate.toLocaleString("en-US", options);
    ws.send(JSON.stringify(obj));
  });
});
