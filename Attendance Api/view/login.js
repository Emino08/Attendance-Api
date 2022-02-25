var express = require("express");
var router = express.Router();
let mysql = require("mysql");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
  multipleStatements: true,
});
              
router.post("/", function (req, res, next) {
  
    const login = {
      userID: req.body.userID,
      password: req.body.password,
    };   
  // console.log(login);
  // console.log(res.send({ hey: 'hi' }));
  // return 
  const sql = `SELECT * FROM login WHERE userID = ${login.userID};`;
     
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {res.send("No result found") } 
    else{
       
    //   let rows = JSON.stringify(result);
    //   console.log(rows[0]);
    //   console.log(result[0].loginID);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        console.log(row.userPassword);
        console.log(result);
          
        if (Number(login.password) === row.userPassword) {
          if (row.usertype === 1) {
              res.send("1");
          } else {
            res.send("2");
            }
              
              // res.end() 
          } else {    
              res.send("Failed to login")
              // res.end()
          } 
      });   
  }                      
  });     
});

// router.put("/courses/:lecturerid/:courseid", function (req, res, next) {
//   let lecturerid = req.params.lecturerid;
//   let courseid = req.params.courseid;

//   let lecturercourses = {
//     lecturerID: req.body.lecturerID,
//     courseID: req.body.courseID,
//   };

//   const sql = `UPDATE lecturercourses SET lecturerID = ${lecturercourses.lecturerID}, courseID = ${lecturercourses.courseID} WHERE lecturerID = ${lecturerid} AND courseID = ${courseid};`;

//   con.query(sql, function (err, result, fields) {
//     // pseudo code
//     // we are simply ignoring it

//     if (err) {
//       if (err.code == "ER_NO_REFERENCED_ROW_2") {
//         return res.end("Foreign Key Constants problem");
//       } else if (err.code == "ER_DUP_ENTRY") {
//         return res.end("Duplicate Entry");
//       } else {
//         throw err;
//       }   
//     }  
//     return res.send(JSON.stringify(result));
//   });
// });  
module.exports = router;
