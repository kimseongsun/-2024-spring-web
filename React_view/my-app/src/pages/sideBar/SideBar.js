import React from "react";
import "../CSS/sideBar.css";
import LogoutButton from "../login/LogoutButton";

const SideBar = ({ items, onItemClick }) => {
  return (
    <aside className="side-bar">
      <ul>
        <div>
          <img
            src="./gameIcon.png"
            style={{ maxWidth: "90%", height: "auto", paddingTop: "10px" }}
          />
          <p style={{ paddingLeft: "20px" }}>Game Recommend</p>
        </div>
        {items.map((item, index) => (
          <li key={index} onClick={() => onItemClick(item)}>
            <a href="#">{item.title}</a>
          </li>
        ))}
      </ul>
      <p className="username">{/* username을 여기에 넣으세요 */}</p>
      <p className="Logout">
        <LogoutButton />
      </p>
    </aside>
  );
};

export default SideBar;
