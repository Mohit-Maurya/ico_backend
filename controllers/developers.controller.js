import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { DeveloperSchema } from "../models/developers.model";
import { BankAccountSchema } from "../models/bankAccount.model";
import logger from "../logger";


const Developer = mongoose.model("Developer", DeveloperSchema);
const BankAccount = mongoose.model("BankAccount", BankAccountSchema);


export const LoginDeveloper = async (req, res) => {
    Developer.findOne({ email: req.body.email }, async (err, result) => {
        // console.log(result)
        if (err) {
            //server error
            res.status(500);
            res.send(err);
        }
        else if (result && result.status != "deleted") {
            if (bcrypt.compare(req.body.password, result.password)) {
                return res.send({response:"Authorized User",userid:result._id});
            }
            else {
                res.status(404);
                res.send({response:"Unauthorised User"});
            }
        } else {
            res.status(404);
            res.send({response:"Unauthorised User"});
        }
    });
};



export const addNewDeveloper = async (req, res) => {
    console.log(req.body)

    const newBankAccount = new BankAccount(req.body.bank);

    // console.log(accountId)

    const newDeveloper = new Developer(req.body.developerDetails);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newDeveloper.password, salt)
    newDeveloper.password = hashedPassword
    newDeveloper.status = "Approved";
    newDeveloper.bank_id = newBankAccount._id
    /// Validations
    if (!req.body.developerDetails.name || !req.body.developerDetails.pan || !req.body.developerDetails.aadhaar ) {
        return res.status(404).json({
            msg: "Some field/fields is/are empty"
        })
    }
    var a = Developer.findOne({ email: req.body.developerDetails.email }, (err, result) => {
        if (result) {
            return res.status(404).json({
                msg: "Email already exists"
            })
        }
    })

    if (req.body.developerDetails.password < 6) {
        return res.status(404).json({
            msg: "Password should be more than 6 letters"
        })
    }

    //// Done Validations
    newDeveloper.save((err, result) => {
        if (err) {
            //server error
            res.status(500);
            res.send(err);
        }
        else if (result) {
            console.log("New Developer added for approval: " + result);
            newBankAccount.save();
            res.status(200).send(result);
        }
    });
};

// All info of developer
export const getDeveloperInfo = async (req, res) => {
    Developer.findOne({ _id: req.params.developerId }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                msg: "Wrong Developer ID"
            })
        }
        else {
            res.status(200).send(result)
        }
    })
}

// delete developer
export const delDeveloper = async (req, res) => {
    Developer.findOneAndUpdate({ _id: req.body.id }, {
        status: "Deleted"
    })
}

// edit Developer
export const editDeveloper = async (req, res) => {
    Developer.updateOne(
        {_id: req.body.id},
        req.body,
        (err, result)=>{
        if(err){
            logger.log({
                level: "error",
                message: "Not found developer",
            })
            return res.status(404).json({
                message: "Not found developer",
            })
        }
        return res.status(200).json({
            message: "Updated developer",
        })
    })
}