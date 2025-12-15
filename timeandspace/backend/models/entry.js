const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: false }
});

module.exports = mongoose.model("Entry", entrySchema);