import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    aadhaar: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    crypto_wallet_link: {
        type: String,
        required: true
    },
    bank_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'bankAccount'
    },
    status: {
        type: String
    },
    password: {
        type: String,
        required: true
    }

},
    { collection: 'developers' }
)