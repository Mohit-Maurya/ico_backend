import mongoose from "mongoose";
var ObjectId = require('mongoose').Types.ObjectId;
import logger from "../logger";
import { BiddingSchema } from "../models/bidding.model";
import { CoinSchema } from "../models/coins.model";
import { allocationEngine } from "../engines/icoAllocation.engine";


const Coin = mongoose.model("Coin", CoinSchema);
const Bidding = mongoose.model("Bidding", BiddingSchema);

export const allCoins = (req, res) => {
    Coin.find({}, (err, result) => {
        if (err) {
            res.status(500);
            logger.log({
                level: "error",
                message: "Could not find coins"
            })
            return res.send(err);
        }
        var data = {
            "Active": [],
            "Closed": [],
            "Upcoming": [],
        }
        var today = new Date();
        for (let key in result) {
            if (typeof result[key].ico_start_date == undefined) {
                result[key].ico_start_date = new Date(String(result[key].ico_start_date))
            }
            if (typeof result[key].ico_end_date == undefined) {
                result[key].ico_end_date = new Date(String(result[key].ico_start_date))
            }
            if (result[key].ico_end_date.getTime() < today.getTime()) {
                data["Closed"].push(result[key])
            }
            else if (result[key].ico_start_date.getTime() > today.getTime()) {
                data["Upcoming"].push(result[key])
            }
            else {
                data["Active"].push(result[key])
            }
        }
        res.status(200).send(data);
    });
};

export const addNewCoin = async (req, res) => {
    const newCoin = new Coin(req.body);

    // console.log(await new Date("2022-08-18"))
    // newCoin.ico_start_date = await new Date("2022-08-11");
    // newCoin.ico_end_date = await new Date("2022-08-15")

    newCoin.save((err, result) => {
        if (err) {
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};

export const coinById = async (req, res) => {
    console.log(req.params.id)
    Coin.find({dev_id:req.params.id}, (err, result) => {
        if (err) {
            logger.log({
                level: "error",
                message: "Wrong coin Id"
            })
            res.status(404).json({
                msg: "Wrong coin status",
            })
        }
        else {
            var data = {
                "Active": [],
                "Closed": [],
                "Upcoming": [],
            }
            var today = new Date();
            console.log(result)
            for (let key in result) {
                if (typeof result[key].ico_start_date == undefined) {
                    result[key].ico_start_date = new Date(String(result[key].ico_start_date))
                }
                if (typeof result[key].ico_end_date == undefined) {
                    result[key].ico_end_date = new Date(String(result[key].ico_start_date))
                }
                if (result[key].ico_end_date.getTime() < today.getTime()) {
                    data["Closed"].push(result[key])
                }
                else if (result[key].ico_start_date.getTime() > today.getTime()) {
                    data["Upcoming"].push(result[key])
                }
                else {
                    data["Active"].push(result[key])
                }
            }
            res.status(200).send(data);
        }
    })
};

export const getCoinWithDevId = (req, res) => {
    Coin.find({dev_id: req.params.developerId}, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.send(result);
        }
    })
}

export const allocate = async (req, res) => {
    const coinId = req.params.coinId;
    const date = new Date();

    const coin = await Coin.findOne({ _id: new ObjectId(coinId) }).exec();

    if (date < coin.ico_start_date) {
        return res.send("Alloaction can't happen before ICO start date.");
    } else if (date >= coin.ico_end_date) {
        const biddings = await Bidding.find({ coin_id: new ObjectId(coinId) }).exec();
        const totalTokensAvailable = coin.total_tokens_available; 
        const allocations = allocationEngine(biddings, totalTokensAvailable);
        if(allocations.allocatedBids.length != 0){
            console.log("allocations: " + allocations.allocatedBids);
            allocations.allocatedBids.forEach(bid => {
                Bidding.updateOne(
                    {_id: new ObjectId(bid._id)}, 
                    {$set: {status: "Accepted", accepted_tokens: bid.token_qty}},
                    (err, result) => {
                        if (err){
                            logger.log({
                                level: "error",
                                message: "Some error : " + err
                            })
                        }
                        console.log(result);
                    });
            });
        }
       
        Coin.findOneAndUpdate({ _id: new ObjectId(coinId) }, { status: "Closed" }, (err, result) => {
            if (err){
                logger.log({
                    level: "error",
                    message: "Some error : " + err
                })
            }
            console.log("updatedCoin" + result);
        });
        Bidding.findOneAndUpdate(
            {_id: allocations.superCase.superCaseId}, 
            {$set: {
                status: "Partially accepted",
                accepted_tokens: allocations.superCase.tokensToBeGranted,
                refund_status: "Refunded"
            }},
            (err, result) => {
                if(err){
                    logger.log({
                        level: "error",
                        message: "Some error : " + err
                    })
                }
                console.log(result);
            }
        );
        const superBid = await Bidding.findOne({_id: allocations.superCase.superCaseId}).exec();
        allocations.allocatedBids.push(superBid);
        const bidIds = allocations.allocatedBids.map(a => a._id);
        Bidding.updateMany(
            { _id: { $nin: bidIds } },
            {
                $set: {
                    status: "Rejected",
                    accepted_tokens: 0,
                    refund_status: "Refunded"
                }
            },
            (err, result) => {
                if(err) console.error(err);
                console.log("Rejected bids" + result);
            }
        );
        return res.send(allocations.allocatedBids);
    } else {
        return res.send("Bidding in process.");
    }
}
