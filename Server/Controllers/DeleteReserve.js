import express from 'express'
import { Reserve } from "../Modals/Reserve.js";

const Delete = express();


Delete.post('/DeleteReserve' , async(req,res)=>{

    try {
        const id = req.body.id;
        await Reserve.deleteOne({_id:id});
        res.status(200).json({msg:'Deleted'})
    } catch (error) {
        console.error(error);
    }
})

export default Delete