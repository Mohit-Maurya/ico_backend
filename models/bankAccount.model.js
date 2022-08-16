import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BankAccountSchema = new Schema({
    bank_acc_num: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    acc_holder_name: {
        type: String,
        required: true
    },
    acc_holder_id: {
        type: String,
        required: true
    }
},
    { collection: 'bankAccount' }
)