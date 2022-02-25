const express = require("express");
var cors = require("cors");
var home = require("./view/home");
var program = require("./view/program");
var courses = require("./view/courses");
var login = require("./view/login");
var student = require("./view/student");
var lecturer = require("./view/lecturer")
var attendance = require("./view/attendance");
 
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    contentType: "application/x-www-form-urlencoded",
  })
);

// {
//     // origin: "*",
//     // accessControlAllowOrigin: true,
//     // methods: ["GET", "POST,", "PUT", "DELETE"],
//     AccessControlAllowOrigin: '*',
//     AccessControlAllowHeaders:
//       "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
//     AccessControlAllowMethods: "POST, GET, PUT, DELETE, OPTIONS",
//     AccessControlAllowCredentials: true,
//   }
       
app.use("/", home);
app.use("/program", program);
app.use("/courses", courses);
app.use("/login", login);
app.use("/student", student);
app.use("/lecturer", lecturer)
app.use("/attendance", attendance);
app.listen(3000, function () {
  console.log("Express server listening on port ", 3000);
});   
module.exports = app;
 