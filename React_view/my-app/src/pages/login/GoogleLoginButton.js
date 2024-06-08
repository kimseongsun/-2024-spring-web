import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "../UserContext";

import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

import "../CSS/login.css";

import axios from "axios";

const GoogleLoginButton = () => {
  const { setUserData } = useContext(UserContext);
  // const navigate = useNavigate();
  const clientId =
    "319228787442-fabuh5r8jivrclmeomoq01tksljegchq.apps.googleusercontent.com";
  // //환경변수에 집어넣어야 함.

  // async function auth() {
  //   try {
  //     const response = await axios.post("/api/login");
  //     const data = response.data;
  //     window.location.href = data.url; // 페이지를 해당 URL로 리다이렉트
  //   } catch (error) {
  //     console.error("Error during authentication:", error);
  //   }
  // }

  // return (
  //   <button type="button" onClick={() => auth()}>
  //     Login!
  //   </button>
  // );

  async function auth(access_token) {
    try {
      const response = await axios.post(
        "/api/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("Backend response:", response.data);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  return (
    <div className="centered-container">
      <h1>Game Recommend GPT Service</h1>
      <img src="./Title.jpg" height={"500px"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ marginRight: "10px" }}>Login for Google</p>
        <div>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              type={"icon"}
              // width={"500px"}
              onSuccess={(res) => {
                const access_token = res.credential;
                const decode_token = jwtDecode(access_token);
                console.log(decode_token);
                //frontEnd 콘솔 창 보여주는 용도

                setUserData(true);
                //수정 필요

                console.log(res);

                auth(access_token);

                console.log("Auth함수 실행됨!");
              }}
              onFailure={(err) => {
                console.log(err);
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
