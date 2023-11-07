import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import RegisterHandler from './Controllers/RegisterHandler.js'
import LoginHandler from './Controllers/LoginHandler.js'
import photos from './Controllers/Cloudinary.js'
import AddReserve from './Controllers/AddReserve.js'
import YourReserves from './Controllers/YourReserves.js'
import Edit from './Controllers/EditReserve.js'
import Update from './Controllers/UpdateReserve.js'
import Delete from './Controllers/DeleteReserve.js'
import AllReserves from './Controllers/Reserves.js'
import GetReserve from './Controllers/GetReserve.js'
import Payment from './Controllers/StripePayment.js'
import BookingCookie from './Controllers/BookingCookie.js'
import YourBookings from './Controllers/YourBooking.js'

const app = express();

const PORT = process.env.PORT || 3000;

//Some Boiler Plate
app.use(express.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const allowedOrigins = ["http://localhost:5173"];
    const corsOptions = {
    origin: function (origin, callback) {
   if (allowedOrigins.indexOf(origin) !== -1) {
  callback(null, true);
    } else {
     var msg =
    "The CORS policy for this site does not " +
    "allow access from the specified Origin.";
     callback(new Error(msg), false);
   }
 },
optionsSuccessStatus: 200,
 credentials: true,
 };
//app.use(cors(corsOptions));
app.use(cors({credentials : true, origin: 'https://reservify-life.onrender.com', }))

//Mongoose Connection
mongoose.connect(process.env.Mongo_ConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", function () {
  console.log("Error Connecting");
});


db.on("open", function () {
  console.log("Successfull Connected to Database ");
});


//Routes
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




//PORT
app.listen(PORT , ()=>{
    console.log(`Server is running well at ${PORT}`)
})