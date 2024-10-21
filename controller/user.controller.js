const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입된 유저");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); //암호화된 값
    const newUser = new User({ email, name, password: hash });

    await newUser.save();
    res.status(200).json({ status: "success!!" });
  } catch (error) {
    res.status(400).json({ status: "Fail", error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디나 비밀번호 불일치");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
