const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    name: { type: String, required: true },
},{ versionKey: false });

CategorySchema.virtual("url").get(function () {
  return `/Category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
