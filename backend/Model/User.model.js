const User = require("./User.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function RegisterUser(username, email, password,firstname,lastname) {
  const user = await User.findOne({ email });
  if (user) {
    console.log("User already exist");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    firstname,
    lastname,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  console.log(savedUser, "from model");
}

// async function LoginUser(email,password){
//  console.log(email,password);
//  const user = await User.findOne({email:email});
//  if(!user){
//     console.log("user doesn't exist");
//     return
//  }
//  const validPassword = await bcrypt.compare(password,user.password);
//  console.log(validPassword)

//  if(!validPassword){
//     console.log('Invalid password');
//     return
//  }
//  const tokenData = {
//     id:user._id,
//     username:user.username,
//     email:user.email
//  }
//  const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN,{expiresIn:'1d'})
//  return token
// }

module.exports = {
  RegisterUser,
};
