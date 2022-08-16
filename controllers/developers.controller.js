import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { DeveloperSchema } from "../models/developers.model";
import { BankAccountSchema } from "../models/bankAccount.model";


const Developer = mongoose.model("Developer", DeveloperSchema);
const BankAccount  = mongoose.model("BankAccount", BankAccountSchema);


export const LoginDeveloper = async(req, res) => {
    Developer.findOne({email : req.body.email}, async (err, result) => {
        // console.log(result)
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result && result.status != "deleted"){
            let verify = await bcrypt.compare(req.body.password,result.password)
            if(verify){
               return res.send("Authorized User");
            }
            else{
                res.status(404);
                res.send("Unauthorised User");
            }
        } else {
            res.status(404);
            res.send("Unauthorised User");
        }
    });
};



export const addNewDeveloper = async (req, res) => {
    console.log(req.body)
    const newBankAccount = new BankAccount(req.body.bank);
    const accountId= await newBankAccount.save();
    
    console.log(accountId)

    const newDeveloper = new Developer(req.body.developerDetails);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newDeveloper.password,salt)
    newDeveloper.password = hashedPassword
    newDeveloper.status = "Approved";
    newDeveloper.bank_id = accountId._id

    newDeveloper.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            console.log("New Developer added for approval: " + result);
            res.status(200).send(result);
        }
    });
};
