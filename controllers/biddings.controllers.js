import mongoose from "mongoose";
import { BiddingSchema } from "../models/bidding.model";

const Bidding = mongoose.model("Bidding", BiddingSchema);

export const addNewBidding = (req, res) => {
    const newBidding = new Bidding(req.body);
    newBidding.status = "Active";

    newBidding.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
}