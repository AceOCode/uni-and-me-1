var mongoose = require("mongoose");
var express = require("express");
var app = express();

var University = require("./models/university.js");
var Course = require("./models/course.js");

//var seed = require("./seed.js");

mongoose.connect("mongodb://localhost:27017/uni-and-me-1", {useNewUrlParser: true});
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("index");
}); 

//INDEX - UNI
app.get("/universities", function(req,res){
    University.find({}, function(err, allUniversities){
        if(err){console.log(err)
        }else{res.render("university/universities", {Universities: allUniversities})}
    });
});


//CREATE - UNI
app.post("/universities", function(req,res){

})

//NEW - UNI
app.get("/universities/new", function(req,res){
    res.render("university/new_uni");
});

//SHOW - UNI
app.get("/universities/:id", function(req,res){
    University.findById(req.params.id, function(err,foundUni){
        if(err){console.log(err);
        }else{res.render("university/show_uni", {university: foundUni})}    
    }); 
});

//INDEX - COURSE
app.get("/courses", function(req,res){
    res.render("courses");
});

app.listen(3000, function(){
    console.log("Server Online");
});