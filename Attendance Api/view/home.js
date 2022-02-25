var express = require("express");
var router = express.Router();
let mysql = require("mysql");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
  multipleStatements:true,
});


const login = {
  userID: "eve.holt@reqres.in",
  password: "cityslicka",
};

const registerProgram = {
  programID:1,
  programName: ""
}
router.get("/", function (req, res, next) {
  res.end("Welcome to You in Home Page");
  // con.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });
});
// Register courses to program
router.post("/", function (req, res, next) {
  const registerProgram = {
    programID: req.body.programID,
    programName: req.body.programName,
  };

  const register = {
    courseID: req.body.courseID,
    courseName: req.body.courseName,
    yearID: req.body.yearID,
  }
  // con.connect(function(err) {
  //     if (err) throw err;
  //     console.log("Connected!");
  // });

  const sql = `INSERT INTO program (programID, programName) VALUES(${registerProgram.programID}, ${registerProgram.programName}); INSERT INTO program (courseID, courseName, yearID, programID) VALUES(${register.courseID}, ${register.courseName}, ${register.yearID}, ${registerProgram.programID}); INSERT INTO programcourses (programID, courseID) VALUES(${registerProgram.programID}, ${register.courseID});`;

  con.query(sql, function (err, result, fields) {
      if (err) throw err;
    res.send('Inserting into a Database' + result)
    // console.log(result.map(e => console.log(e)));
    console.log(fields)
    
  })
  
});
module.exports = router;
