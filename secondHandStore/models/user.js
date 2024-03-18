const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String },
  password: { type: String },
  token:{type:String}
});

// Export model
module.exports = mongoose.model("User", UserSchema);
