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
    console.log("req params ",req.params)
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

export const bidsByInvestor = (req,res) =>{
    Bidding.find({investor_id:req.params.id},(err, result) => {
        if (err) {
            logger.log({
                level: "error",
                message: "Wrong bid status"
            })
            res.status(404).json({
                msg: "bid not found status",
            })
        }
        else {
            res.status(200).send(result)
        }
    })
}

export const getBidbyCoin = (req,res) =>{
    console.log("req params getbidbycoin ",req.params)
    Bidding.findOne({coin_id: req.params.coinId, investor_id: req.params.investorId}, (err, result)=>{
        if(err){
            logger.log({
                level: "error",
                message: "Some error"
            })
            return res.status(500).json({
                msg: "Some error in request"
            })
        }
        else{
            if(result != null){
                return res.status(200).json({
                    msg: "Bid exists",
                    data: result
                })
            }
            else{
                return res.status(404).json({
                    msg: "Bid does not exist"
                })
            }
        }
    })
}

export const bidUpdate = (req,res) =>{
    logger.log({
        level: "warn",
        message: "in update"
    })
    Bidding.updateOne({_id: req.body.id},req.body,(err, result)=>{
        logger.log({
            level: "warn",
            message: "Problem: " + JSON.stringify(req.body)
        })
        if (err){
            logger.log({
                level: "error",
                message: "Not found Bid",
            })
            return res.status(404).json({
                message: "Not found Bid",
            })
        }
        else{
            return res.status(200).json({
                message: "Updated Bid",
            })
        }
    })
}