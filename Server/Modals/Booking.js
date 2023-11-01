import mongoose from "mongoose";

const BookingScheme = new mongoose.Schema({

  Owner:String,
  Customer: {type:mongoose.Schema.Types.ObjectId , ref:'User'},
  MainTitle:String,
  Schedule:String,
  photo: String,
  address:String,
  location:String,
  category:String,
  amount:String,
  Date:String


 

}) 

 const Booking = mongoose.model('Booking',BookingScheme );

 export default Booking;
