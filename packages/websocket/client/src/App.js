import React, { Fragment, useEffect, useCallback, useRef } from "react";
import User from "./components/User.jsx";

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = new WebSocket("ws://127.0.0.1:3000");

    socket.current.onopen = (event) => {
      console.log("Server connected!");
    };

    socket.current.onmessage = (event) => {
      console.log("Message reiceved from server -> ", JSON.parse(event.data));
      const data = JSON.parse(event.data);
      const { user, message, time } = data;
      if (user == "Caller") {
        calleeRef.current.recieveMessage(time, message);
      } else if (user == "Callee") {
        callerRef.current.recieveMessage(time, message);
      }
    };
  }, []);

  const handler = useCallback((e) => {
    socket.current.send(JSON.stringify(e));
  });

  const callerRef = useRef("callerRef");
  const calleeRef = useRef("calleeRef");

  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>
        Simple chat application using websocket
      </h1>
      <div style={{ display: "flex" }}>
        <User type="Caller" handler={handler} ref={callerRef}></User>
        <User type="Callee" handler={handler} ref={calleeRef}></User>
      </div>
    </Fragment>
  );
}

export default App;
