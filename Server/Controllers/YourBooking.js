import express from 'express'
import jwt from 'jsonwebtoken'
import Booking from '../Modals/Booking.js';

const jwtKey  = process.env.JWTCONSTANT;

const YourBookings = express();

YourBookings.get('/getYourBookings' , async(req,res)=>{
  
try {
    const {Jwttoken} = req.cookies;
   
   
    
    

    jwt.verify(Jwttoken , jwtKey , { expiresIn: '24h'} , async(err, userdata)=>{
        if(err) throw err
       const id = userdata.id;
       res.status(200).json(await Booking.find({Customer:id}));
       })
  

} catch (error) {
    console.log(error)
}

   

})

export default YourBookings