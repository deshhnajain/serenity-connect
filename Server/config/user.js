const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: { type: String, required: [true, "a name is required"], unique: true },
  price: { type: Number, required: [true, "price is required"] },
});
const Serenity_connect = mongoose.model('test',UserSchema);
module.exports = Serenity_connect;