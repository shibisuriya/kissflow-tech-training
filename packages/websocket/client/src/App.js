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
      const { messageType, user, message, time } = data;
      if (messageType == "isTyping") {
        if (user == "Caller") {
          calleeRef.current.typingStart(data);
        } else if (user == "Callee") {
          callerRef.current.typingStart(data);
        }
      } else {
        if (user == "Caller") {
          calleeRef.current.recieveMessage(time, message);
        } else if (user == "Callee") {
          callerRef.current.recieveMessage(time, message);
        }
      }
    };
  }, []);

  const isTyping = (data) => {
    const { user } = data;
    console.log("isTyping -> ", data);
    socket.current.send(JSON.stringify({ messageType: "isTyping", user }));
  };

  const handler = useCallback((e) => {
    const { messageType, message } = e;
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
        <User
          type="Caller"
          handler={handler}
          isTyping={isTyping}
          ref={callerRef}
        ></User>
        <User
          type="Callee"
          handler={handler}
          isTyping={isTyping}
          ref={calleeRef}
        ></User>
      </div>
    </Fragment>
  );
}

export default App;
