var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

var University = require("./models/university.js");
var Course = require("./models/course.js");
var User = require("./models/user.js");
//var seed = require("./seed.js");

//Connects mongoose to the DB server.
mongoose.connect("mongodb://localhost:27017/uni-and-me-1", {useNewUrlParser: true});

//Sets .ejs ectension by default.
app.set("view engine", "ejs");

// This lets us use body parser which is used for reading forms out of request files.
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"The Secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Taking data from the session and un/encoding it.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//==================================================================
//Routes Routes Routes Routes Routes Routes Routes Routes Routes
//==================================================================

app.get("/", function(req,res){
    res.render("index", {currentUser: req.user});
}); 

//==================================================================
// UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI UNI
//==================================================================

//INDEX - UNI
app.get("/universities", function(req,res){
    University.find({}, function(err, allUniversities){
        if(err){console.log(err);
        }else{res.render("university/universities", {unis: allUniversities})}
    });
});

//NEW - UNI
app.get("/universities/new", isLoggedIn, function(req,res){
    res.render("university/new_uni"); 
});

//CREATE - UNI
app.post("/universities", isLoggedIn, function(req,res){
    University.create(req.body.uni, function(err, newlyCreated){
        if(err){console.log(err);
        }else{res.redirect("/universities")} 
    });    
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

//NEW -COURSE
app.get("/courses/new", isLoggedIn, function(req,res){
    University.find({}, function(err,universities){
        if(err){console.log(err);
        }else{res.render("course/new_course", {universities: universities})}
    });
});

//CREATE - COURSE
//This updates the DB to have new courses for the respective university.
app.post("/courses", isLoggedIn, function(req,res){
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

//==================================================================
// USER USER USER USER USER USER USER USER USER USER USER USER USER
//==================================================================

//Log In------------------------------------------------------------
app.get("/login", function(req,res){
    res.render("user/login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }
), function(req,res){
});

//Register----------------------------------------------------------
app.get("/register", function(req,res){
    res.render("user/register");
});     

app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    //Change this to an environmental variable
    if(req.body.adminpassword === "IronMan>Cap"){
        //2-Step Auth will be added here.
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err)
            return res.render("user/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});

//Log Out-----------------------------------------------------------
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});


//==========
//Middleware
//==========

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{res.redirect("/login")}
}
//==================================================================
// AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH AUTH
//==================================================================



app.listen(3000, function(){
    console.log("Server Online");
});