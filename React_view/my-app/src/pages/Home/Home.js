import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import SideBar from "../sideBar/SideBar";
import "../CSS/home.css"; // CSS 파일을 가져옵니다.

import axios from "axios";

const Home = () => {
  const [txtValue, setTextValue] = useState(""); // 빈 배열
  const [printedValues, setPrintedValues] = useState([]); // 출력할 값 저장
  const scrollRef = useRef(null); // 스크롤을 제어할 ref
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [evaluation, setEvaluation] = useState(false); // 기본 값 true로 설정

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

  // feedback을 post하는 함수
  async function postFeedback() {
    console.log("함수 진입 성공!!");
    const response = await axios.post("/api/feedback", {
      user_feedback: feedbackTxt,
      evaluation: evaluation,
    });
  }

  // 입력값 변화 핸들러
  const onChange = (e) => {
    setTextValue(e.target.value);
  };

  // 피드백 입력값 변화 핸들러
  const onChange_feedback = (e) => {
    setFeedbackTxt(e.target.value);
  };

  // 평가 선택 핸들러
  const onChange_evaluation = (e) => {
    setEvaluation(e.target.value === "good" ? false : true);
    console.log(evaluation);
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
                      typewriter
                        .typeString(entry.answer)
                        .start()
                        .pauseFor(100)
                        .callFunction((state) => {
                          state.elements.cursor.style.display = "none";
                        })
                        .callFunction(() => {
                          if (scrollRef.current) {
                            scrollRef.current.scrollTop =
                              scrollRef.current.scrollHeight;
                          }
                        });
                    }}
                    options={{
                      delay: 20,
                    }}
                  />
                </div>
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
          />
          <button onClick={handleKeyPress}>print</button>
        </div>
      </div>
      <div className="feedback-container">
        <div style={{ width: "500px" }}>
          <img
            src="./cat.png"
            style={{ maxWidth: "50%", height: "auto", paddingTop: "10px" }}
          />
        </div>
        <h3>feedback</h3>
        <input
          type="text"
          style={{ width: "500px", height: "200px" }}
          value={feedbackTxt}
          onChange={onChange_feedback}
        />
        <br></br>
        <div>
          <input
            type="radio"
            id="good"
            name="feedback"
            value="good"
            onChange={onChange_evaluation}
          />
          <label htmlFor="good">good</label>
        </div>
        <div>
          <input
            type="radio"
            id="bad"
            name="feedback"
            value="bad"
            onChange={onChange_evaluation}
          />
          <label htmlFor="bad">bad</label>
        </div>
        <button onClick={postFeedback}>submit</button>
      </div>
    </>
  );
};

export default Home;
