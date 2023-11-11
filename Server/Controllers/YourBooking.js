import express from "express";
import jwt from "jsonwebtoken";
import Booking from "../Modals/Booking.js";

const accessKey = process.env.ACCESS;

const YourBookings = express();
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
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
YourBookings.get("/getYourBookings", authenticateToken,async (req, res) => {
  try {
    const TokenData = req.user.Userdata;
    const id = TokenData._id;
    res.status(200).json(await Booking.find({ Customer: id }));
  } catch (error) {
    console.log(error);
  }
});

export default YourBookings;
