const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId,ref:"Category" },
    condition: { type: String, required: true },
    price: {type:Number},
    ownerName:{type:String},
    ownerTelephon:{type:String}
},{ versionKey: false });

module.exports = mongoose.model("Product", ProductSchema);
