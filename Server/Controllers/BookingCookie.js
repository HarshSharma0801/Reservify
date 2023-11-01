import express from 'express'
import jwt from 'jsonwebtoken'
import Booking from '../Modals/Booking.js';

const jwtKey  = process.env.JWTCONSTANT;


const BookingCookie = express();


BookingCookie.post('/Booking' , async(req,res)=>{


    const data = req.body;
    try {
        
      jwt.sign(data, jwtKey , { expiresIn: '600s'} , (err,token)=>{
        if(err) throw err;
        res.cookie('BookingJwt', token).json({msg:"cookie"});
       
      })

    } catch (error) {
        
    }

})


BookingCookie.get('/BookingData' , async(req,res)=>{

    const {BookingJwt , Jwttoken} = req.cookies;

    if(Jwttoken){
        jwt.verify(Jwttoken , jwtKey , { expiresIn: '24h'} , async(err, Provider)=>{
         if(err) throw err
         const id = Provider.id ;
         if(BookingJwt){
            jwt.verify(BookingJwt , jwtKey , { expiresIn: '600s'} , async(err, data)=>{
             if(err) throw err
             const today = new Date();
             const date = today.getDate()+'/'+(today.getMonth()+1) + '/'+today.getFullYear();
             const main = {...data , Customer:id , Date:date}
             
             await Booking.insertMany(main); 
             res.status(200).json({data:"SUCCESS"});
            })
            
            console.log("Api Call");
        }
        })
    }
    
    else{
        res.status(200).send("no data");
    }
})





export default BookingCookie