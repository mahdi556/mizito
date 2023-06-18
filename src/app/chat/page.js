"use client";
import ToggleContext from "@/context/ToggleContext";
// import { useContext, useEffect } from "react";
// import ToggleContext from "@/context/ToggleContext";
// const Chat = () => {
//   const { socket } = useContext(ToggleContext);
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to socket");
//     },[socket]);

//     socket.on("message", (data) => {
//       console.log("Received message:", data);
//     });
//     return () => {
//       socket.off("connect");
//       socket.off("message");
//     };
//   }, []);
//   const sendMessage = () => {
//     socket.emit("chat message", { sender: 'hamid', receiver:'mahdi', message: "second message!" });
//     console.log('sent Message')
//   };
//   return (
//     <>
//       <div className="col-10 mx-auto">
//         <div>
//           <button onClick={sendMessage}>Send Message</button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Chat;

import { useContext, useEffect, useState } from "react";

const Chat = () => {
    const { socket } = useContext(ToggleContext);

  // const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Create a new Socket.IO client
    // const newSocket = io();
    // Set the socket in state for later use
    // setSocket(newSocket);

    // Listen for incoming messages
    socket.on("chat message", ({ sender, receiver, message }) => {
      setMessages((prevMessages) => [...prevMessages, { sender, receiver, message }]);
    });

    return () => {
      // Disconnect the Socket.IO client when the component is unmounted
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    // Send a message to the server
    socket.emit("chat message", { sender: "me", receiver: "you", message });
    // Clear the input field
    setMessage("");
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      {messages.map(({ sender, receiver, message }, index) => (
        <p key={index}>
          {sender}: {message}
        </p>
      ))}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
