const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: {type: String, required: true },
    contentType: {type: String,  required: true },
})

const Upload = mongoose.model('Upload', uploadSchema)


module.exports = Upload;