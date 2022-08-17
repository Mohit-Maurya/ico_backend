import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { InvestorSchema } from "../models/investors.model";
import { BankAccountSchema } from "../models/bankAccount.model";


const Investor = mongoose.model("Investor", InvestorSchema);
const BankAccount = mongoose.model("BankAccount", BankAccountSchema);



export const LoginInvestor = async (req, res) => {
    Investor.findOne({ email: req.body.email }, async (err, result) => {
        console.log(result)
        if (err) {
            //server error
            res.status(500);
            res.send(err);
        }
        else if (result && result.status != "deleted") {
            if (await bcrypt.compare(req.body.password, result.password)) {
                return res.send("Authorized User");
            } else {
                res.status(404);
                res.send("Unauthorised User");
            }
        } else {
            res.status(404);
            res.send("Unauthorised User");
        }
    });
};



export const addNewInvestor = async (req, res) => {
    console.log(req.body)
    /// Validations
    if (!req.body.name || !req.body.pan || !req.body.aadhar || !req.body.phone_number || req.body.email || !req.body.bank_id) {
        return res.status(404).json({
            msg: "Some field/fields is/are empty"
        })
    }
    var a = Investor.findOne({ email: req.email }, (err, result) => {
        if (result) {
            return res.status(404).json({
                msg: "Email already exists"
            })
        }
    })

    if (req.body.password < 6) {
        return res.status(404).json({
            msg: "Password should be more than 6 letters"
        })
    }

    //// Done Validations
    const newBankAccount = new BankAccount(req.body.bank);

    const newInvestor = new Investor(req.body.investorDetails);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newInvestor.password, salt)
    newInvestor.password = hashedPassword
    newInvestor.status = "Approved";
    newInvestor.bank_id = newBankAccount._id

    newInvestor.save((err, result) => {
        if (err) {
            //server error
            res.status(500);
            res.send(err);
        }
        else if (result) {
            console.log("New Investor added for approval: " + result);
            newBankAccount.save();
            return res.status(200).send(result);
        }
    });
};
