import React, { useState } from "react";
import { Modal, Button } from "antd";

const SaveModal = ({ visible, onClose, onSave, question, answer, image }) => {
  const [title, setTitle] = useState(question);

  const handleSave = () => {
    onSave({ title, answer, image });
    onClose();
  };

  return (
    <Modal
      title="저장하기"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          취소
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          저장
        </Button>,
      ]}
      width={800}
    >
      <label htmlFor="title">제목:</label>
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
          Height: "400px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        {answer.map((entry, index) => (
          <div key={index}>
            <div>{entry}</div>
            <img src={image[index]} alt="./cat.png" />
          </div>
        ))}
        {/* {image.map((entry, index) => (
          <div key={index}>
            <img src={entry} />
          </div>
        ))} */}
      </div>
    </Modal>
  );
};

export default SaveModal;
