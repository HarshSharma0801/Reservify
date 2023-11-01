import express from 'express'
import { Reserve } from '../Modals/Reserve.js';

const Edit = express();

Edit.get('/Edit/:id' , async(req,res)=>{

    try {
        const id = req.params.id ;
        res.status(200).send(await Reserve.findById(id));

    } catch (error) {
        console.log(error)
    }
})





export default Edit 