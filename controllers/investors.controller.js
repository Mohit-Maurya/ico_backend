import mongoose from "mongoose";
// import bcrypt from 'bcrypt';
import { InvestorSchema } from "../models/investors.model";


const Investor = mongoose.model("Investor", InvestorSchema);


// "/user/:userId" 


// TODO: encrypt password --- Sweety
export const addNewUser = async (req, res) => {
    const newUser = new Investor(req.body);
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(newUser.password,salt)
    // newUser.password = hashedPassword
    // newUser.userId = newUser.mobileNumber;
    // newUser.status = "Appoved";

    newUser.save((err, result) => {
        if (err){
            //server error
            res.status(500);
            res.send(err);
        }
        else if(result){
            console.log("New user added for approval: " + result);
            res.status(200).send(result);
        }
    });
};
