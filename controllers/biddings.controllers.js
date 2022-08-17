import mongoose from "mongoose";
import logger from "../logger";
import { BiddingSchema } from "../models/bidding.model";

const Bidding = mongoose.model("Bidding", BiddingSchema);


export const addNewBidding = (req, res) => {
    const newBidding = new Bidding(req.body);
    newBidding.status = "Active";

    newBidding.save((err, result) => {
        if (err) {
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
}

export const bidsPerStatus = (req, res) => {
    Bidding.find({ investor_id: req.params.investorId, status: req.params.status }, (err, result) => {
        if (err) {
            logger.log({
                level: "error",
                message: "Wrong bid status"
            })
            res.status(404).json({
                msg: "Wrong bid status",
            })
        }
        else {
            res.status(200).send(result)
        }
    })
}