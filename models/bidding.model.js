import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const BiddingSchema = new Schema({
    coin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coins',
        required: true
    },
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers',
        required: true
    },
    token_qty: {
        type: Number,
        required: true
    },
    bidding_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    accpeted_token: {
        type: Number,
        required: true
    },
},
    { collection: 'biddings' }
)