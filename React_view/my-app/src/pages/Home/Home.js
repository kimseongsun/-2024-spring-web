import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import SideBar from "../sideBar/SideBar";
import Feedback from "./Feedback";
import "../CSS/home.css"; // CSS 파일을 가져옵니다.

import axios from "axios";

const Home = () => {
  const [txtValue, setTextValue] = useState(""); // 빈 배열
  const [printedValues, setPrintedValues] = useState([]); // 출력할 값 저장
  const scrollRef = useRef(null); // 스크롤을 제어할 ref

  let image_link = "";

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
    let total_answer = "";
    response.data.forEach((obj) => {
      for (let key in obj) {
        console.log("key: ", key);
        total_answer += obj[key] + "\n";
        if (key === "image_link") {
          image_link = obj[key];
        }
      }
    });
    const newEntry = {
      question: txtValue,
      answer: total_answer,
    };
    setPrintedValues([...printedValues, newEntry]);
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
      <SideBar />
      <div className="home-container">
        <h1>Game Recommend GPT Service</h1>

        {/*  */}
        <div ref={scrollRef} className="output-container">
          {printedValues.map((entry, index) => (
            <div key={index}>
              <p>
                <strong>Q:</strong> {entry.question}
              </p>
              <div>
                <strong>A:</strong>
                <div>
                  <img
                    src="./cat.png"
                    style={{
                      maxWidth: "50%",
                      height: "auto",
                      paddingTop: "10px",
                    }}
                  />
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(entry.answer).start().pauseFor(100);
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
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        {/*  */}

        <div className="input-container">
          <input
            type="text"
            value={txtValue}
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleKeyPress}>print</button>
        </div>
      </div>

      <Feedback />
    </>
  );
};

export default Home;
