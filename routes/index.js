const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");

router.use("/tasks", taskApi); // tasks라는 주소로 요청이 오면 taskApi로 가도록 설정
//router.use("/users", usersApi);

module.exports = router;
