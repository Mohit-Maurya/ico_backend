import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const CoinSchema = new Schema({
    name_of_token: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    ico_start_date: {
        type: Date,
        required: true
    },
    ico_start_date: {
        type: Date,
        required: true
    },
    price_range: {
        min: Number,
        max: Number,
    },
    category: {
        type: String,
        required: true
    },
    min_token_qty: {
        type: Number,
        required: true
    },
    whitepaper: {
        type: String,
        required: true
    },
    dev_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers',
        required: true
    },
    status: {
        type: String,
        required: true
    },
},
    { collection: 'coins' }
)