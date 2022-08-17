import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const CoinSchema = new Schema({
    token_name: {
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
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    platform: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    min_token_qty: {
        type: Number,
        required: true
    },
    status:{
        type: String,
    },
    whitepaper: {
        type: String,
        required: true
    },
    dev_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers',
        required: true
    }
},
    { collection: 'coins' }
)