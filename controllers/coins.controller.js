import mongoose from "mongoose";
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
        for (let key in result) {
            data[result[key].status] = result[key];
        }
        res.status(200).send(data);
    });
};

export const addNewCoin = async (req, res) => {
    // console.log(req.body)
    const newCoin = new Coin(req.body);

    console.log(await new Date("2022-08-18"))
    newCoin.ico_start_date = await new Date("2022-08-11");
    newCoin.ico_end_date = await new Date("2022-08-15")

    newCoin.save((err, result) => {
        if (err) {
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

    const coin = await Coin.findOne({ _id: coinId }).exec();

    if (date < coin.ico_start_date) {
        return res.send("Alloaction can't happen before ICO start date.");
    } else if (date >= coin.ico_end_date) {
        const biddings = await Bidding.find({ coin_id: coinId }).exec();
        const totalTokensAvailable = coin.total_tokens_available
        const allocations = allocationEngine(biddings, totalTokensAvailable);
        Coin.find({ _id: { $in: allocations.allocateInvestors } }, (err, result) => {
            if (err) throw err;
        })
        return res.send(allocations);
    } else {
        return res.send("Bidding in process.");
    }
}
