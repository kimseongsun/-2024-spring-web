import React, { useContext } from "react";
import Home from "./pages/Home/Home";

import LoginButton from "./pages/login/LoginButton";

import { UserProvider, UserContext } from "./pages/UserContext";
import GoogleLoginButton from "./pages/login/GoogleLoginButton";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppContent />
      </div>
    </UserProvider>
  );
}

function AppContent() {
  const { userData } = useContext(UserContext);
  //수정 필요함

  return userData ? <Home /> : <GoogleLoginButton />;
}

export default App;
