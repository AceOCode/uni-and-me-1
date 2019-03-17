var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    name: String,
    level: String //e.g. BSc BA MSc Phd
});

var Course = mongoose.model("Course", courseSchema);
module.exports = Course;