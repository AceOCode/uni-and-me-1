var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost:27017/uni-and-me-1", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("index");
}); 

app.get("/universities", function(req,res){
    res.render("universities");
});

app.get("/courses", function(req,res){
    res.render("courses");
});

app.listen(3000, function(){
    console.log("Server Online");
});