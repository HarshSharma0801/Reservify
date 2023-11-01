import express from "express";
import { Reserve } from "../Modals/Reserve.js";
import Edit from "./EditReserve.js";

const Update = express();

Update.post("/Edit/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = data._id;

    await Reserve.findByIdAndUpdate(id, data);
    res.status(200).send({ msg: "Updated" });
  } catch (error) {
    console.log(error);
  }
});

export default Update;
