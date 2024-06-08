import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function LogoutButton() {
  const { userData, setUserData } = useContext(UserContext);

  function logOut() {
    alert("Logout!");
    setUserData(false); // Set userData to false on logout
  }

  return <button onClick={logOut}>Logout</button>;
}

export default LogoutButton;
