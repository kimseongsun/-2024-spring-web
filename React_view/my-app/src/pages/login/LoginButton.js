import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function LoginButton() {
  const { setUserData } = useContext(UserContext);

  function handleClick() {
    alert("Login 성공!");
    setUserData(true);
  }

  return (
    <div className="centered-container">
      <button onClick={handleClick}>Google Login</button>
    </div>
  );
}

export default LoginButton;
