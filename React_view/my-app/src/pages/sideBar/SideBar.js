import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/sideBar.css";
import LogoutButton from "../login/LogoutButton";
import SidebarModal from "../Home/SidebarModal";
import axios from "axios";

const SideBar = ({ savedData }) => {
  const [username, setUsername] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    try {
      const response = await axios.get("/api/home");
      // 프록시가 여기서만 적용이 안되는 문제 발생
      console.log("Fetch data 성공!");
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleTitleClick = (data) => {
    setSelectedData(data);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="side-bar">
      <ul>
        <div>
          <img
            src="./gameIcon.png"
            style={{ maxWidth: "90%", height: "auto", paddingTop: "10px" }}
            alt="Game Icon"
          />
          {/* img Default경로는 public으로 되어 있음 */}
          <p style={{ paddingLeft: "20px" }}>Game Recommend</p>
        </div>
        {savedData.map((data, index) => (
          <li key={index} onClick={() => handleTitleClick(data)}>
            <Link to="#">
              <i className="fa-solid fa-cat"></i>
              {data.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="username">{username}</p>
      <p className="Logout">
        <LogoutButton />
      </p>
      {selectedData && (
        <SidebarModal
          data={selectedData}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SideBar;
