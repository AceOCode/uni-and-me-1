var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    name: String,
    level: String, //e.g. BSc BA MSc Phd
    university: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "University"
        }
    ],
    author: String
});

var Course = mongoose.model("Course", courseSchema);
module.exports = Course;