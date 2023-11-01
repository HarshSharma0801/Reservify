import express from 'express'
import User from '../Modals/Users.js';
import bcrypt from 'bcrypt'

// const salt   = await bcrypt.genSalt(4); no bcrypt
const RegisterHandler = express();

RegisterHandler.post('/register' , async (req,res)=>{
    
    const { username, email, password} = req.body;

    const userdata = {
        name:username,
        email:email,
        password: password

    }

    try {
        console.log("User Added");
        return await User.insertMany(userdata);
       
        
    } catch (error) {
        console.log(error)
    }

})


export default RegisterHandler