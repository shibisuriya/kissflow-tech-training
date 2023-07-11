import React from "react";

const SayHello = () => {
  return <h1>Hello from SayHello.jsx</h1>;
};
export default function App() {
  return (
    <div>
      <h1>Hello from App.jsx</h1>
      <SayHello />
    </div>
  );
}
