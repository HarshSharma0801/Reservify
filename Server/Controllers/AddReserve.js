import express from 'express'
import { Reserve } from '../Modals/Reserve.js';
import jwt from 'jsonwebtoken'

const accessKey  = process.env.ACCESS;

const AddReserve = express();

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


AddReserve.post('/addReserve' , authenticateToken , async(req,res)=>{

 try {
    
    const Clientdata = req.body;
    const user = req.user
    

    
        const today = new Date();
        const date = today.getDate()+'/'+(today.getMonth()+1) + '/'+today.getFullYear();
        const main = {...Clientdata , Provider:user.Userdata._id , Date:date}
        await Reserve.insertMany(main);
        console.log("added");
        res.status(200).json({msg:'send'})
       
    
 } catch (error) {
    console.log(error);
 }

})

export default AddReserve

