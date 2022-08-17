import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BiddingSchema = new Schema({
    coin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coins',
        required: true
    },
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investors',
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
        type: String
    },
    accepted_tokens: {
        type: Number
    },
    refund_status: {
        type: String
    }
},
    { collection: 'biddings' }
)