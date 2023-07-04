import React, { forwardRef, useImperativeHandle, useState } from "react";

const Caller = forwardRef(({ type, handler }, ref) => {
  const recieveMessage = (time, message) => {
    console.log(`Message recieved to ${type} user. ${message} on ${time}`);
    setMessages((messages) => [...messages, [time, message]]);
  };

  useImperativeHandle(ref, () => ({
    recieveMessage,
  }));

  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div style={{ width: "50%", textAlign: "center" }}>
      <h2>{type}</h2>
      <div>
        <div style={{ textAlign: "left" }}>
          {messages.map((message, index) => {
            const [time, data, who] = message;
            return (
              <div
                style={{
                  paddingLeft: "50px",
                  ...(who == "self" ? { color: "grey" } : {}),
                }}
                key={index}
              >
                {time} - {data}
              </div>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setChat("");

            const currentDate = new Date();
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            const formattedTime = currentDate.toLocaleString("en-US", options);
            setMessages((messages) => [
              ...messages,
              [formattedTime, chat, "self"],
            ]);

            handler({ message: chat, user: type });
          }}
        >
          <div style={{ marginTop: "16px" }}>
            <input
              type="text"
              value={chat}
              onChange={(e) => {
                const { value: message } = e?.target ?? "";
                setChat(message);
              }}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Caller;
