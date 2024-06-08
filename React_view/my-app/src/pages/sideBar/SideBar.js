import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/sideBar.css";
import LogoutButton from "../login/LogoutButton";

import axios from "axios";

const SideBar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    try {
      const response = await axios.get("/api/home");
      //프록시가 여기서만 적용이 안되는 문제 발생
      console.log("Fet data 성공!");
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <aside className="side-bar">
      {/* <section className="side-bar__icon-box">
        <section className="side-bar__icon-1">
          <div></div>
        </section>
      </section> */}
      <ul>
        <div>
          <img
            src="./gameIcon.png"
            style={{ maxWidth: "90%", height: "auto", paddingTop: "10px" }}
          />
          {/* img Default경로는 public으로 되어 있음 */}
          <p style={{ paddingLeft: "20px" }}>Game Recommend</p>
        </div>
        <li>
          <Link to="#">
            <i class="fa-solid fa-cat"></i>Title
          </Link>
        </li>
      </ul>
      <p className="username">{username}</p>
      <p className="Logout">
        <LogoutButton />
      </p>
    </aside>
  );
};
export default SideBar;
