import express from 'express'
import { Reserve } from '../Modals/Reserve.js';
import User from '../Modals/Users.js';
const GetReserve = express();

GetReserve.get('/Reserve/:id' , async(req,res)=>{

    try {
        const id = req.params.id ;
        res.status(200).send(await Reserve.findById(id));

    } catch (error) {
        console.log(error)
    }
})

GetReserve.post('/Reserve/Provider' , async(req,res)=>{
    try {
        const id = req.body.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
})





export default GetReserve 