var mongoose = require("mongoose");
var University = require ("./models/university.js");
var Course = require("./models/course.js");

function SeedDB(){
    University.create({
        name: "LSE",
        country: "UK"
    });    
    Course.create({
        name: "Economics",
        level: "BSc"
    })
    Course.create({
        name: "Politics",
        level: "BSc"
    },function(err,course){
        University.findOne({name:"LSE"}, function(err, found){
            found.courses.push(course);
            found.save(function(err, result){console.log(result)});
        });
    });
}

module.exports = SeedDB();