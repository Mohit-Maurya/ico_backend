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
                return res.send({response:"Authorized User",userid:result._id});
            } else {
                res.status(404);
                res.send({response:"Unauthorised User"});
            }
        } else {
            res.status(404);
            res.send({response:"Unauthorised User"});
        }
    });
};



export const addNewInvestor = async (req, res) => {
    console.log(req.body)
    /// Validations
    if (!req.body.investorDetails.name || !req.body.investorDetails.pan || !req.body.investorDetails.aadhaar || !req.body.investorDetails.phone_number || !req.body.investorDetails.email) {
        return res.status(404).json({
            msg: "Some field/fields is/are empty"
        })
    }
    var a = Investor.findOne({ email: req.body.investorDetails.email }, (err, result) => {
        if (result) {
            return res.status(404).json({
                msg: "Email already exists"
            })
        }
    })

    if (req.body.investorDetails.password < 6) {
        return res.status(404).json({
            msg: "Password should be more than 6 letters"
        })
    }

    //// Done Validations
    const newBankAccount = new BankAccount(req.body.bank);
    console.log("new bank ",newBankAccount)

    const newInvestor = new Investor(req.body.investorDetails);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newInvestor.password, salt)
    newInvestor.password = hashedPassword
    newInvestor.status = "Approved";
    newInvestor.bank_id = newBankAccount._id

    console.log("newinvestor ",newInvestor)
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

// All info of Investor
export const getInfo = async (req, res) => {
    Investor.findOne({ _id: req.params.investorId }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                msg: "Wrong Investor ID"
            })
        }
        else {
            res.status(200).send(result)
        }
    })
}

// delete Investor
export const delInvestor = async (req, res) => {
    Investor.findOneAndUpdate({ _id: req.body.id }, {
        status: "Deleted"
    })
}

// edit Investor
export const editInvestor = async (req, res) => {
    Investor.updateOne(
        {_id: req.body.id},
        req.body,
        (err, result)=>{
        if(err){
            logger.log({
                level: "error",
                message: "Not found Investor",
            })
            return res.status(404).json({
                message: "Not found Investor",
            })
        }
        return res.status(200).json({
            message: "Updated Investor",
        })
    })
}