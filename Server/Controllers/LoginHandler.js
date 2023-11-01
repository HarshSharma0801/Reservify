import express from 'express'
import User from '../Modals/Users.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const jwtKey  = process.env.JWTCONSTANT;


const LoginHandler = express();

LoginHandler.post("/login" , async(req,res)=>{

   const {email,password} = req.body;
   try {
    const Userdata = await User.findOne({email:email , password:password});
    if(Userdata){
      
            jwt.sign({id:Userdata._id , email: Userdata.email}, jwtKey , { expiresIn: '24h'} , (err,token)=>{
                if(err) throw err;
                res.cookie('Jwttoken', token).json({valid:"success" , UserInfo:Userdata});
               
                console.log("valid")

           })}
        
        else{
            console.log("password not valid");
            res.status(200).json("not valid");
        }
    
   } catch (error) {
    console.log(error);
   }

})


LoginHandler.get('/CookieToken' , (req,res)=>{

    const {Jwttoken} = req.cookies;
    if(Jwttoken){
        jwt.verify(Jwttoken , jwtKey , { expiresIn: '24h'} , async(err, data)=>{
         if(err) throw err
         const TokenData = await User.findById(data.id)
         res.status(200).json(TokenData);
        })
    }
    else{
        res.status(200).json(null);
    }
})




LoginHandler.post('/logout' , (req,res)=>{
    res.status(200).cookie('Jwttoken', '').json("Sign Out");
})




export default LoginHandler