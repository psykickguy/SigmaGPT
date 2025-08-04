import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <section className="sidebar">
      <button>
        <img src="src/assets/backlogo.png" alt="gpt logo"></img>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        <li>history1</li>
        <li>history1</li>
        <li>history1</li>
      </ul>

      <div className="sign">
        <p>By PsykickGuy &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;
