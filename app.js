var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

var University = require("./models/university.js");
var Course = require("./models/course.js");

//var seed = require("./seed.js");

mongoose.connect("mongodb://localhost:27017/uni-and-me-1", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.render("index");
}); 

//INDEX - UNI
app.get("/universities", function(req,res){
    University.find({}, function(err, allUniversities){
        if(err){console.log(err);
        }else{res.render("university/universities", {unis: allUniversities})}
    });
});


//CREATE - UNI
app.post("/universities", function(req,res){
    University.create(req.body.uni, function(err, newlyCreated){
        if(err){console.log(err);
        }else{res.redirect("/universities")} 
    });    
});

//NEW - UNI
app.get("/universities/new", function(req,res){
    res.render("university/new_uni"); 
});

//SHOW - UNI
app.get("/universities/:id", function(req,res){
    University.findById(req.params.id, function(err,foundUni){
        if(err){console.log(err);
        }else{res.render("university/show_uni", {uni: foundUni})}    
    }); 
});

//==================================================================
// COURSE COURSE COURSE COURSE COURSE COURSE COURSE COURSE COURSE
//==================================================================

//INDEX - COURSE
//We want to view all of our courses in this route.
app.get("/courses", function(req,res){
    res.send("This is the INDEX - COURSE route")
});

//SHOW - COURSE
//We want to be able to have detailed information about each individual course.
app.get("/universities/:id/courses/:course_id", function(req,res){
    // Add a find course by id and pass into the ejs file in the res.render as "course".
    res.render("course/show_course");
});

//CREATE - COURSE
//This updates the DB to have new courses for the respective university.
app.post("/courses", function(req,res){
    University.findOne({name: req.body.course.university}, function(err,foundUniversity){
        if(err){console.log(err);
        }else{
            var course = {name: req.body.course.name, level: req.body.course.level, university: foundUniversity}
            Course.create(course, function(err, newCourse){
                if(err){console.log(err);
                }else{
                    foundUniversity.courses.push(newCourse);
                    foundUniversity.save();
                    res.redirect("/universities/" + foundUniversity._id);
                }
            });
        }
    });
});
//NEW -COURSE
app.get("/courses/new", function(req,res){
    University.find({}, function(err,universities){
        if(err){console.log(errr);
        }else{res.render("course/new_course", {universities: universities})}
    });
});

//SHOW - COURSE

app.listen(3000, function(){
    console.log("Server Online");
});