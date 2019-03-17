var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost:27017/uni-and-me-1", {useNewUrlParser: true});

app.get("/", function(req,res){
    res.send("/ page");
    
}); 

app.listen(3000, function(){
    console.log("Server Online");
});