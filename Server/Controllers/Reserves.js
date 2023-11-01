import { Reserve } from "../Modals/Reserve.js";
import express from 'express'

const AllReserves = express();


AllReserves.get('/', async(req,res)=>{

    try {
        const data = await Reserve.find({});
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
})

export default AllReserves