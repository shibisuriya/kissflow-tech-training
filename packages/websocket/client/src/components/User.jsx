import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";

const Caller = forwardRef(({ type, handler, isTyping }, ref) => {
  const recieveMessage = (time, message) => {
    console.log(`Message recieved to ${type} user. ${message} on ${time}`);
    setMessages((messages) => [...messages, [time, message]]);
  };

  const typingStart = (data) => {
    console.log("typing start", data);
    setIsInputInProgress(data.user);
    setTimeout(() => {
      setIsInputInProgress("");
    }, 1000);
  };

  useImperativeHandle(ref, () => ({
    recieveMessage,
    typingStart,
  }));

  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [isInputInProgress, setIsInputInProgress] = useState(false);

  const getCurrentTime = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return currentDate.toLocaleString("en-US", options);
  };

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
            const currentTime = getCurrentTime();
            setMessages((messages) => [
              ...messages,
              [currentTime, chat, "self"],
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
                isTyping({ user: type });
              }}
            />
          </div>
          {isInputInProgress && (
            <div style={{ color: "grey", fontWeight: "bold" }}>
              {isInputInProgress} is typing
            </div>
          )}

          <div style={{ marginTop: "16px" }}>
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Caller;
