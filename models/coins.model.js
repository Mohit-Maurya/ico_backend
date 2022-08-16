import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const DeveloperSchema = new Schema({
    name_of_token: {
        type:String,
        required:true
    },
    about: {
        type:String,
        required:true
    },

}, 
{ collection : 'developers' }
)