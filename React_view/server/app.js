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
let answer_query = [
  {
    answer:
      "LoL: LOL은 아주 좋은aaaa 게임입니다!!!!!!!!!!\n Tag1, tag2, tag3, ...",
    // tag: "",
    image_link:
      "https://png.pngtree.com/png-clipart/20220620/ourmid/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_5230763.png",
    // game_link:"",
  },
  {
    answer: "Dota: Dota는 아주 재밌는 게임입니다!\n tag1, tag2, tag3",
    image_link:
      "https://png.pngtree.com/png-clipart/20220620/ourmid/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_5230763.png",
    // tag: "",
    // game_link:"",
  },
];

//초기 로그인 화면
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

//저장버튼 눌렀을 때 동작
app.post("/save_modal", async (req, res) => {
  try {
    console.log("save_modal Post처리 동작!");
    const save_data = {
      title: req.body.title,
      answers: req.body.answers,
      images: req.body.images,
    };
    console.log("유저가 저장하려고 하는 data: ", save_data);
  } catch (error) {}
});

//DB에서 saved_modal받아오는 동작 이 함수에 추가되야 함
//현재는 임시의 데이터를 넘김
app.get("/get_saved_modal", async (req, res) => {
  const saved_modal = [
    {
      title: "공포게임 추천좀",
      answer: [
        "아웃라스트: good\n Tag1, tag2, tag3, ...\n",
        "프란체스카: Dota는 아주 재밌는 게임입니다!\n tag1, tag2, tag3\n",
      ],
      image: [
        "https://i.namu.wiki/i/i255o_1T071_2LKEUu5AEf3zxKRlfjyeykD4iFF3FHy0L6OokPuIOKjFrh_mFdusrzGwnMr-nP3NRZGtncg9KQ.webp",
        "https://blog.kakaocdn.net/dn/bpPn6e/btqNCyBzkrA/trWKadLKdLi67GrYVWZo9k/img.png",
      ],
    },
    {
      title: "격투게임 추천좀",
      answer: [
        "스트리트파이터: LOL은 아주 좋은aaaa 게임입니다!!!!!!!!!!\n Tag1, tag2, tag3, ...\n",
        "철권: Dota는 아주 재밌는 게임입니다!\n tag1, tag2, tag3\n",
      ],
      image: [
        "https://i.namu.wiki/i/N_MIvNeHhaG9V1CEt7UMahE83oAGdDBO5WP6C95H7asqTRdSHzwFozWHfBwgqbUJwpLQ_P_XX5rW_WnpusVhbg.webp",
        "https://image.dongascience.com/Photo/2018/03/43d397eddb96c7a9d2ad16061347c688.jpg",
      ],
    },
  ]; //임시 데이터

  try {
    res.json(saved_modal);
  } catch (error) {}
});

app.listen(port, () => {
  console.log("Sever Start!");
});
