const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");

// const dotenv = require("dotenv");
// dotenv.config();

const jwtDecode = require("jwt-decode");

const { OAuth2Client } = require("google-auth-library");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const cors = require("cors");
// app.use(cors());
//프록시 적용 안되는거 땜빵

let user_name = "";
let user_email = "";
let evaluation = false;
let user_feedback = "";
let user_query = "";
//수정 필요함
let answer_query = [
  {
    1: "LoL: LOL은 아주 좋은aaaa 게임입니다!!!!!!!!!!",
    tag: "Tag1, tag2, tag3, ...",
    image_link:
      "https://png.pngtree.com/png-clipart/20220620/ourmid/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_5230763.png",
  },
  {
    2: "Dota: Dota는 아주 재밌는 게임입니다!",
    image_link:
      "https://png.pngtree.com/png-clipart/20220620/ourmid/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_5230763.png",
    tag: "tag1, tag2, tag3",
  },
];

app.post("/login", async (req, res) => {
  console.log("AXIOS 성공!");
  const access_token = String(req.headers.authorization.split("[0]")); // 액세스 토큰 추출
  console.log("ACCESS Token:", access_token);

  const decode_token = jwtDecode.jwtDecode(access_token);
  console.log("Decoded Token:", decode_token);
  user_name = decode_token.name;

  user_email = decode_token.email;
  console.log("user Email: ", user_email);
  //유저 정보 decoding
});

app.get("/home", async (req, res) => {
  console.log("AXIOS 성공!");
  res.json(user_name);
});

//초기 로그인 화면

app.get("/answer_Query", async (req, res) => {
  console.log("answer_Query Get Axios 성공!");
  res.json(answer_query);
});

app.post("/user_Query", async (req, res) => {
  try {
    console.log("Server user_Query Post 요청 성공");
    user_query = req.body.user_query;
    console.log("user_Query from front_end: ", user_query);

    res.status(200).json({ message: "Query received", query: user_query });
  } catch (error) {
    console.error("Error handling user_Query:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    console.log("feedback Post처리 서버로 전달됨!");
    const user_feedback = req.body.user_feedback;
    const evaluation = req.body.evaluation;
    console.log("user_feedback: ", user_feedback);
    console.log("evaluation: ", evaluation);
  } catch (error) {
    console.error(error);
  }
});
const feedbackData = {
  st_id: user_email,
  input: user_query,
  output: answer_query,
  satisfied: evaluation,
  feedback: user_feedback,
};

app.listen(port, () => {
  console.log("Sever Start!");
});
