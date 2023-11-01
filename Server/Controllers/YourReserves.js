import express from 'express'
import jwt from 'jsonwebtoken'
import { Reserve } from '../Modals/Reserve.js';

const jwtKey  = process.env.JWTCONSTANT;

const YourReserves = express();

YourReserves.get('/getYourReserve' , async(req,res)=>{
  
try {
    const {Jwttoken} = req.cookies;

   
    
    

    jwt.verify(Jwttoken , jwtKey , { expiresIn: '24h'} , async(err, userdata)=>{
        if(err) throw err
       const id = userdata.id;
       if(userdata.email=='admin@admin'){
        res.status(200).json(await Reserve.find({}));

       }
       else{
        res.status(200).json(await Reserve.find({Provider:id}));

       }
       })
  

} catch (error) {
    console.log(error)
}

   

})

export default YourReserves