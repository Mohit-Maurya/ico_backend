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
        Coin.find({_id: {$in: allocations.allocateInvestors}}, (err, result) => {
            if (err) throw err;
        })
        return res.send(allocations);
    } else {
        return res.send("Bidding in process.");
    }
}
