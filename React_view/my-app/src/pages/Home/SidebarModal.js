import React from "react";
import { Modal, Button } from "antd";

const SidebarModal = ({ data, visible, onClose }) => {
  if (!data) {
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          닫기
        </Button>,
      ]}
      width={700}
    >
      <p>제목: {data.title}</p>
      <label htmlFor="answer">내용:</label>
      <div
        id="answer"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          Height: "500px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        {data.answer.map((entry, index) => (
          <div key={index}>
            <div>{entry}</div>
            <img src={data.image[index]} />
          </div>
        ))}
        {/* {image.map((entry, index) => (
          <div key={index}>
            <img src={entry} />
          </div>
        ))} */}

        {/* <label htmlFor="title">제목:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <label htmlFor="answer">내용:</label>
      <div
        id="answer"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          Height: "500px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        {answer.map((entry, index) => (
          <div key={index}>
            <div>{entry}</div>
            <img src={image[index]} />
          </div>
        ))}
        {/* {image.map((entry, index) => (
          <div key={index}>
            <img src={entry} />
          </div>
        ))} */}
      </div>{" "}
      */}
    </Modal>
  );
};

export default SidebarModal;
