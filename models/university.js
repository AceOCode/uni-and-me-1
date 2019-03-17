var mongoose = require("mongoose");

var universitySchema = new mongoose.Schema({
    name: String,
    country: String,
    courses: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course"
        }
    ]
});

var University = mongoose.model("University", universitySchema);
module.exports = University;