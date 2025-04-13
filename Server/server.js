import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import RegisterHandler from "./Controllers/RegisterHandler.js";
import LoginHandler from "./Controllers/LoginHandler.js";
import photos from "./Controllers/Cloudinary.js";
import AddReserve from "./Controllers/AddReserve.js";
import YourReserves from "./Controllers/YourReserves.js";
import Edit from "./Controllers/EditReserve.js";
import Update from "./Controllers/UpdateReserve.js";
import Delete from "./Controllers/DeleteReserve.js";
import AllReserves from "./Controllers/Reserves.js";
import GetReserve from "./Controllers/GetReserve.js";
import Payment from "./Controllers/StripePayment.js";
import BookingCookie from "./Controllers/BookingCookie.js";
import YourBookings from "./Controllers/YourBooking.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_API_URL,
    credentials: true,
  })
);

// Mongoose Connection
mongoose.connect(process.env.Mongo_ConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Error Connecting"));
db.on("open", () => console.log("Successfully Connected to Database"));

// Test cookie route
app.get("/set-test-cookie", (req, res) => {
  const cookies = req.cookies;
  res.cookie("testCookie", "testValue", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ message: "Cookie set", cookies });
});

// Routes
app.use(RegisterHandler);
app.use(LoginHandler);
app.use(photos);
app.use(AddReserve);
app.use(YourReserves);
app.use(Edit);
app.use(Update);
app.use(Delete);
app.use(AllReserves);
app.use(GetReserve);
app.use(Payment);
app.use(BookingCookie);
app.use(YourBookings);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running well at ${PORT}`);
});
