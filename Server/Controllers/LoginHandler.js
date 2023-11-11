import express from "express";
import User from "../Modals/Users.js";
import jwt from "jsonwebtoken";

const accessKey = process.env.ACCESS;
const refreshKey = process.env.REFRESH;


//Created Routes

const LoginHandler = express();

const authenticateToken = (req, res, next) => {
  const  authHeader= req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, accessKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};
 
LoginHandler.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Userdata = await User.findOne({ email: email, password: password });

    if (Userdata) {
      const accessToken = jwt.sign({Userdata}, accessKey, { expiresIn: "15m" });
      const refreshToken = jwt.sign({Userdata}, refreshKey);

      res.json({ access: accessToken, refresh: refreshToken  , UserInfo:Userdata , valid:"success"});

    } else {
      console.log("password not valid");
      res.status(200).json("not valid");
    }
  } catch (error) {
    console.log(error);
  }
});

LoginHandler.get("/Token",authenticateToken ,(req, res) => {
   const TokenData = req.user;
  res.status(200).json(TokenData);
});

LoginHandler.post("/logout", (req, res) => {
  res.status(200).cookie("Jwttoken", "").json("Sign Out");
});

export default LoginHandler;
