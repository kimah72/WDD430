const mongoose = require("mongoose");

// removed unique validator import as it's not used. Mongoose has built-in unique option.

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);