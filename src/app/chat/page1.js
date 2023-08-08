"use client";
import ToggleContext from "@/context/ToggleContext";
import { useContext, useEffect, useState } from "react";

const Chat = () => {
  const { socket } = useContext(ToggleContext);
  const [messages, setMessages] = useState([]);
  const [allmessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [reciever, setReciever] = useState("");
  const [roomId, setRoomId] = useState(null);
  // const roomId = [userId, reciever].sort().join("");
  // const roomId = 7585;
  socket.on("connect", () => {
    // Join chat room
    if (roomId) {
      socket.emit("join-room", roomId, userId);
    }
  });

  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId, userId);
    }
    socket.on("all-messages", (all) => {
      setAllMessages(all);
      console.log(all);
    });
    const handleMessage = (message, userId) => {
      console.log("recievd");
      setMessages((prevMessages) => [...prevMessages, { message, userId }]);
    };
    socket.on("receive-message", handleMessage);

    // socket.on("receive-message", (message, userId) => {
    //   console.log("recievd");
    //   setMessages((prevMessages) => [...prevMessages, { message, userId }]);
    // });
    return () => {
      socket.off("receive-message", handleMessage);
    };

    // Listen for incoming messages

    // return () => {
    //   // Disconnect the Socket.IO client when the component is unmounted
    //   socket.disconnect();
    // };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message == "" || userId == "" || reciever == "") {
      alert("complete data");
      return;
    }
    socket.emit("send-message", message, roomId, userId, (error) => {
      console.log(message, roomId, userId);
      if (error) {
        console.error(error);
      } else {
        setMessage("");
        console.log(message, roomId, userId);
      }
    });
  };
  console.log(messages);

  return (
    <div
      style={{
        height: "80vh",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <label htmlFor="userId">کد کاربری</label>
      <input
        type=""
        name="userId"
        onChange={(e) => setUserId(e.target.value)}
      />
      <div className="row mt-3">
        <h4>
          نام من :{" "}
          {userId == 75
            ? "علی"
            : userId == 85
            ? "حسین"
            : userId == 95
            ? "محمود"
            : "NONE"}{" "}
        </h4>
      </div>
      <div className="d-flex my-5 ">
        <div
          className="pointer bg-primary px-2 mx-3"
          onClick={() => {
            setReciever(75);
            setRoomId([userId, 75].sort().join(""));
          }}
        >
          <h6>علی</h6>
        </div>

        <div
          className="pointer bg-primary px-2 mx-3"
          onClick={() => {
            setReciever(85);
            setRoomId([userId, 85].sort().join(""));
          }}
        >
          <h6>حسین</h6>
        </div>

        <div
          className="pointer bg-primary px-2 mx-3"
          onClick={() => {
            setReciever(95);
            setRoomId([userId, 95].sort().join(""));
          }}
        >
          <h6>محمود</h6>
        </div>
      </div>
      <h2>roomId : {roomId}</h2>
      <h1>Real-time Chat</h1>
      {allmessages.map(({ message, user }, index) => (
        <p key={index}>
          {userId}: {message}
        </p>
      ))}
      {messages.map(({ message, userId }, index) => (
        <p key={index}>
          {userId}: {message}
        </p>
      ))}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
