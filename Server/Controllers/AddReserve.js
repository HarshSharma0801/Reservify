import express from 'express'
import { Reserve } from '../Modals/Reserve.js';
import jwt from 'jsonwebtoken'

const jwtKey  = process.env.JWTCONSTANT;

const AddReserve = express();


AddReserve.post('/addReserve' , async(req,res)=>{

 try {
    const {Jwttoken} = req.cookies;

    const Clientdata = req.body;
    
    

    jwt.verify(Jwttoken , jwtKey , { expiresIn: '24h'} , async(err, userdata)=>{
        if(err) throw err
        const today = new Date();
        const date = today.getDate()+'/'+(today.getMonth()+1) + '/'+today.getFullYear();
        const main = {...Clientdata , Provider:userdata.id , Date:date}
        await Reserve.insertMany(main);
        console.log("added");
        res.status(200).json({msg:'send'})
       })
    
 } catch (error) {
    console.log(error);
 }

})

export default AddReserve

