import React from "react";
import "./ChatWindow.css";
import Chat from "./Chat";

function ChatWindow() {
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmaGPT <i class="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span className="userIcon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>

      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything"></input>
          <div id="submit">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">I never make mistake</p>
      </div>
    </div>
  );
}

export default ChatWindow;
