import React, { useState } from "react";
import axios from "axios";

import "../CSS/feedback.css";

function Feedback() {
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [evaluation, setEvaluation] = useState(false); // 기본 값 true로 설정
  const [visible, setVisible] = useState(true); // 올바른 철자로 수정

  // 피드백 입력값 변화 핸들러
  const onChange_feedback = (e) => {
    setFeedbackTxt(e.target.value);
  };

  // 평가 선택 핸들러
  const onChange_evaluation = (e) => {
    setEvaluation(e.target.value === "good" ? true : false);
    console.log(evaluation);
  };

  // feedback을 post하는 함수
  async function postFeedback() {
    setVisible(false);
    console.log("Visible: ", visible);
    console.log("함수 진입 성공!!");
    const response = await axios.post("/api/feedback", {
      user_feedback: feedbackTxt,
      evaluation: evaluation,
    });
  }

  return visible ? (
    <div className="feedback-container">
      <div style={{ width: "350px" }}>
        <img
          src="./cat.png"
          style={{ maxWidth: "50%", height: "auto", paddingTop: "10px" }}
        />
      </div>
      <h3>FeedBack</h3>
      <textarea
        type="text"
        style={{
          width: "400px",
          height: "175px",
          resize: "none",
          fontSize: "1.2rem",
        }}
        value={feedbackTxt}
        placeholder="소중한 의견 부탁드려요 :D"
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
  ) : (
    <div className="feedback-container">
      <div style={{ width: "500px" }}>
        <img
          src="./cat.png"
          style={{ maxWidth: "50%", height: "auto", paddingTop: "10px" }}
        />
      </div>
      <h3>Feedback 제출 완료</h3>
      <button onClick={() => setVisible(true)}>다시 제출</button>
    </div>
  );
}

export default Feedback;
