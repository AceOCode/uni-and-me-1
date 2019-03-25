var passportLocalMongoose = require("passport-local-mongoose");
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Adds passport functionality to the User Schema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);