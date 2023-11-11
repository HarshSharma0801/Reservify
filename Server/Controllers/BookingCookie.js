import express from "express";
import jwt from "jsonwebtoken";
import Booking from "../Modals/Booking.js";

const Key = process.env.REFRESH;
const accessKey = process.env.ACCESS;

const BookingCookie = express();

const authenticateToken = (req, res, next) => {
    console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, accessKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.customer = user;
    next();
  });
};

const authenticateUser = (req, res, next) => {
  const token = req.headers["main"];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, Key, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

BookingCookie.post("/Booking", async (req, res) => {
  const data = req.body;
  try {
    const BookingToken = jwt.sign({ data }, Key, { expiresIn: "2m" });
    res.json({ BookingToken: BookingToken, msg: "cookie" });
  } catch (error) {}
});

BookingCookie.get(
  "/BookingData",
  authenticateToken,authenticateUser,
  async (req, res) => {
    const BookingData = req.user.data;
   const id = req.customer.Userdata._id
      const today = new Date();
      const date =
        today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
      const main = { ...BookingData, Customer: id, Date: date };

      await Booking.insertMany(main);
    res.status(200).json({ data: "SUCCESS" });

    console.log("Api Call");
  }
);

export default BookingCookie;
