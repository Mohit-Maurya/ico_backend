import mongoose from "mongoose";
import logger from "../logger";
import { CoinSchema } from "../models/coins.model";

const Coin = mongoose.model("Coin", CoinSchema);

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
        res.status(200).send(result);
    });
};

export const addNewCoin = (req, res) => {
    const newCoin = new Coin(req.body);

    newCoin.save((err, result) => {
        if (err) {
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};
