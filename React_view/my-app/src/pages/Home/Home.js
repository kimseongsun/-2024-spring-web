import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import SideBar from "../sideBar/SideBar";
import Feedback from "./Feedback";
import SaveModal from "./SaveModal";
import SidebarModal from "./SidebarModal"; // SidebarModal 추가
import "../CSS/home.css"; // CSS 파일을 가져옵니다.
import axios from "axios";

const Home = () => {
  const [txtValue, setTextValue] = useState(""); // 빈 배열
  const [printedValues, setPrintedValues] = useState([]); // 출력할 값 저장
  const [modalVisible, setModalVisible] = useState(
    Array(printedValues.length).fill(false)
  );
  const [savedData, setSavedData] = useState([]); // 저장된 데이터를 저장할 상태
  const scrollRef = useRef(null); // 스크롤을 제어할 ref

  const handleOpenModal = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = true;
    setModalVisible(newModalVisible);
  };

  const handleCloseModal = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = false;
    setModalVisible(newModalVisible);
  };

  const handleSave = (data) => {
    // 저장 로직을 처리하는 함수
    setSavedData([...savedData, data]); // 저장된 데이터 추가
    console.log("저장된 데이터:", data);
  };

  // user_Query post 요청
  async function postUserQuery(txtValue) {
    try {
      const response = await axios.post("/api/user_Query", {
        user_query: txtValue,
      });
    } catch (error) {
      console.error("Post Query에서 문제 발생", error);
    }
  }

  // answer_Query get 요청
  async function FetchData() {
    await postUserQuery(txtValue);
    const response = await axios.get("/api/answer_Query");

    const entries = [];
    const image_link = [];
    const answers = [];

    response.data.forEach((obj) => {
      for (let key in obj) {
        if (key === "image_link") {
          image_link.push(obj[key]);
        } else {
          console.log("key: ", key);
          answers.push(obj[key] + "\n");
        }
      }
    });
    const entry = {
      question: txtValue,
      answer: answers,
      image: image_link,
    };
    entries.push(entry);

    setPrintedValues([...printedValues, ...entries]);
    setModalVisible([...modalVisible, false]);
    console.log("printValues", printedValues);
    setTextValue("");
  }

  // 입력값 변화 핸들러
  const onChange = (e) => {
    setTextValue(e.target.value);
  };

  // 입력값 엔터 또는 클릭 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      FetchData();
    }
  };

  // 출력값 스크롤 최하단 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [printedValues]);

  return (
    <>
      <SideBar savedData={savedData} /> {/* savedData를 SideBar로 전달 */}
      <div className="home-page">
        <div className="home-container">
          <h1>Game Recommend GPT Service</h1>

          <div ref={scrollRef} className="output-container">
            {printedValues.map((entry, index) => (
              <div key={index}>
                <div>
                  <strong>Q:</strong> {entry.question}
                  <div style={{ position: "relative" }}>
                    {/* Save 버튼을 오른쪽 상단에 위치 */}
                    <button
                      onClick={() => handleOpenModal(index)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    >
                      Save
                    </button>
                    <SaveModal
                      visible={modalVisible[index]}
                      onClose={() => handleCloseModal(index)}
                      onSave={handleSave}
                      question={entry.question}
                      answer={entry.answer}
                      image={entry.image}
                    />
                  </div>
                </div>
                <div>
                  <strong>A:</strong>
                  {entry.answer.map((ans, ansIndex) => (
                    <div key={ansIndex}>
                      {entry.image[ansIndex] && (
                        <img
                          src={entry.image[ansIndex]}
                          alt="./cat.png"
                          style={{
                            maxWidth: "35%",
                            height: "auto",
                            paddingTop: "10px",
                          }}
                        />
                      )}
                      <>
                        <Typewriter
                          onInit={(typewriter) => {
                            typewriter.typeString(ans).start();
                          }}
                          onStep={(step, typewriter) => {
                            if (scrollRef.current) {
                              scrollRef.current.scrollTop =
                                scrollRef.current.scrollHeight;
                            }
                          }}
                          options={{
                            delay: 1,
                          }}
                        />
                      </>
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={txtValue}
              onChange={onChange}
              onKeyPress={handleKeyPress}
              placeholder="원하는 게임을 입력하세요!"
            />
            <button onClick={handleKeyPress}>print</button>
          </div>
        </div>
        <Feedback />
      </div>
    </>
  );
};

export default Home;
