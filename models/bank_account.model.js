import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BankAccountSchema = new Schema({
    bank_acc_num: {
        type: Number,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    acc_holder_name: {
        type: String,
        required: true
    }
},
    { collection: 'bankAccount' }
)