import mongoose from "mongoose";
import { CoinSchema } from "../models/coins.model";

const Coin = mongoose.model("Coin", CoinSchema);

export const allCoins = (req, res) => {
    Coin.find({}, (err, result) => {
        if(err) {
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};

export const addNewCoin = async (req, res) => {
    // console.log(req.body)
    const newCoin = new Coin(req.body);
    console.log(await new Date("2022-08-18"))
    newCoin.ico_start_date = await new Date("2022-08-11");
    newCoin.ico_end_date   = await new Date("2022-08-15")
    
    newCoin.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            return res.send(err);
        }
        res.send(result);
    });
};
