import mongoose from "mongoose";


 const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

export const Comment = mongoose.model('Comment',CommentSchema );



const ReserveScheme = new mongoose.Schema({

  Provider: {type:mongoose.Schema.Types.ObjectId , ref:'User'},
  MainTitle:String,
  photos:[String],
  address:String,
  location:String,
  description:String,
  category:String,
  price:String,
  rating:String,
  amenities:[String],
  comments:[CommentSchema],
  Date:String


 

}) 

export const Reserve = mongoose.model('Reserve',ReserveScheme );
