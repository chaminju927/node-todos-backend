const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

router.use("/user", userApi);
router.use("/tasks", taskApi); // tasks라는 주소로 요청이 오면 taskApi로 가도록 설정
//router.use("/users", usersApi);

module.exports = router;
