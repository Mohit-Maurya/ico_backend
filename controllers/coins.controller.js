import mongoose from "mongoose";
import { BiddingSchema } from "../models/bidding.model";
import { CoinSchema } from "../models/coins.model";
import { allocationEngine } from "../engines/icoAllocation.engine";

const Coin = mongoose.model("Coin", CoinSchema);
const Bidding = mongoose.model("Bidding", BiddingSchema);

export const allCoins = (req, res) => {
    Coin.find({}, (err, result) => {
        if(err) {
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};

export const addNewCoin = (req, res) => {
    const newCoin = new Coin(req.body);
    
    newCoin.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};

export const allocate = async (req, res) => {
    const coinId = req.params.coinId;
    const date = new Date();
    
    const coin = await Coin.findOne({_id: coinId}).exec();

    if(date < coin.ico_start_date) {
        return res.send("Alloaction can't happen before ICO start date.");
    } else if(date >= coin.ico_end_date) {
        const biddings = await Bidding.find({coin_id: coinId}).exec();
        const totalTokensAvailable = coin.total_tokens_available
        const allocations = allocationEngine(biddings, totalTokensAvailable);
        Bidding.updateMany(
            {_id: {$in: allocations.allocateBids}},
            {$set: {status: "Accepted", accpeted_tokens: `${biddings.token_qty}`}},
            (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        Coin.updateOne({_id: coinId}, {status: "Closed"}, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        Bidding.updateOne(
            {_id: allocations.superCase.superCaseInvId}, 
            {$set: {
                status: "Partially accepted", 
                accpeted_tokens: `${allocations.superCase.tokensToBeGranted}`,
                refundedStatus: "Refunded"
            }}
        );
        allocations.allocatedBids.push(allocations.superCase.superCaseInvId);
        Bidding.updateMany(
            {_id: {$ne: {$in: allocations.allocatedBids}}},
            {$set: {
                status: "Rejected",
                accpeted_tokens: 0,
                refundedStatus: "Refunded"
                }
            }
        );
        return res.send(allocations);
    } else {
        return res.send("Bidding in process.");
    }
}
