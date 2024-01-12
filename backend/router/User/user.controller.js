const { RegisterUser } = require("../../Model/User.model");
const User = require("../../Model/User.mongo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register Handler
async function httpRegisterUser(req, res) {
  const { username, email, password,firstname,lastname } = req.body;
  try {
    await RegisterUser(username, email, password,firstname,lastname);
    res.status(201).json({ message: "user created successfully",status:200 });
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
}

//login Handler
async function httpLoginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "User doesn't exist" });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      res.status(401).json({ message: "invalid password" });
      return;
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    const Options = {
      httpOnly: true,
      secure: true,
    };
    const loggedInUser = await User.findOne(user._id).select("-password");
    res
      .status(200)
      .cookie("token_calendar", token, Options)
      .json({
        messages: "user logged in and cookie is set",
        status: 200,
        data: loggedInUser,
        token
      });
  } catch (error) {

    res.status(500).json({ messages: "Internal server error" });
  }
}

async function getAllUser(req,res){
  try {
    const response = await User.find({}).select('-password ')
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
}
async function deleteUser(req,res){
  const _id = req.params.id;

  try {
    const response = await User.deleteOne({_id:_id})
    res.status(200).json({response,status:200})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Internal Server Error'})
  }
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  getAllUser,
  deleteUser
};
