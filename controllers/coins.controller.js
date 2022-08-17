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
        var today = new Date();
        for (let key in result) {
            // logger.log({
            //     level: "info",
            //     message: typeof result[key].ico_start_date
            // })
            // logger.log({
            //     level: "info",
            //     message: result[key]
            // })
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
        Bidding.updateMany(
            { _id: { $in: allocations.allocatedBids } },
            { $set: { status: "Accepted", accpeted_tokens: `${biddings.token_qty}` } },
            (err, result) => {
                if (err) throw err;
                console.log(result);
            });
        Coin.updateOne({ _id: coinId }, { status: "Closed" }, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        Bidding.updateOne(
            { _id: allocations.superCase.superCaseInvId },
            {
                $set: {
                    status: "Partially accepted",
                    accpeted_tokens: `${allocations.superCase.tokensToBeGranted}`,
                    refundedStatus: "Refunded"
                }
            }
        );
        allocations.allocatedBids.push(allocations.superCase.superCaseInvId);
        Bidding.updateMany(
            { _id: { $ne: { $in: allocations.allocatedBids } } },
            {
                $set: {
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
