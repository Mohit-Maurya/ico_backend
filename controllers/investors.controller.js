import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { InvestorSchema } from "../models/investors.model";


const Investor = mongoose.model("Investor", InvestorSchema);


export const addNewInvestor = async (req, res) => {
    const newInvestor = new Investor(req.body);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newInvestor.password,salt)
    newInvestor.password = hashedPassword
    newInvestor.userId = newInvestor.phone_number;
    newInvestor.status = "Approved";

    newInvestor.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            console.log("New Investor added for approval: " + result);
            res.status(200).send(result);
        }
    });
};
