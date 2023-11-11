import express from 'express'
import jwt from 'jsonwebtoken'
import { Reserve } from '../Modals/Reserve.js';

const accessKey = process.env.ACCESS;

const YourReserves = express();

const authenticateToken = (req, res, next) => {
    const  authHeader= req.headers["authorization"];
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

YourReserves.get('/getYourReserve', authenticateToken , async(req,res)=>{
  
try {
        
    const TokenData = req.user.Userdata;
    const id = TokenData._id;
       if(TokenData.email=='admin@admin'){
        res.status(200).json(await Reserve.find({}));

       }
       else{
        res.status(200).json(await Reserve.find({Provider:id}));

       }


} catch (error) {
    console.log(error)
}

   

})

export default YourReserves