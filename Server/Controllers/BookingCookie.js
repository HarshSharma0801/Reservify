import express from "express";
import jwt from "jsonwebtoken";
import Booking from "../Modals/Booking.js";
import axios from "axios";
import { randomUUID } from "crypto";
const Key = process.env.REFRESH;
const accessKey = process.env.ACCESS;

const Production = process.env.NODE_ENV === "production";

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
  authenticateToken,
  authenticateUser,
  async (req, res) => {
    const BookingData = req.user.data;
    const cookies = req.cookies;
    console.log(cookies , "coookiiesss")
    const promoTrackingSession = cookies.hanami_tracking_session;

    const id = req.customer.Userdata._id;
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const main = { ...BookingData, Customer: id, Date: date };

    await Booking.insertMany(main);

    let conversionData = null;

    console.log(promoTrackingSession , "cookieeeeeeeee")
    let conversions = [];
    if (promoTrackingSession) {
      conversionData = {
        session_id: randomUUID(),
        trackers: JSON.parse(promoTrackingSession).trackers,
        amount: BookingData.amount,
        currency: "USD",
      };
      const { data } = await axios.post(
        `${process.env.HANAMI_URL}/api/conversion`,
        conversionData
      );

      console.log("Api Call", data.conversions);
      conversions = data.conversions;
      res.clearCookie("hanami_tracking_session", {
        httpOnly: true,
        sameSite: "Lax",
        secure: Production,
      });
    }

    res.status(200).json({
      data: "SUCCESS",
      conversions: conversions,
    });
  }
);

export default BookingCookie;
