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
  let courses = {
    courseID: req.body.courseID,
    courseName: req.body.courseName,
    programID: req.body.programID,
    semester: req.body.semester,
    yearID: req.body.yearID,
  };
 
  const sql = `INSERT INTO course (courseID,courseName,programID,semester,yearID) VALUES(${courses.courseID}, '${courses.courseName}', ${courses.programID}, ${courses.semester}, ${courses.yearID});`;

  con.query(sql, function (err, result, fields) {
    // pseudo code
    // we are simply ignoring it
    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2") {
        return res.end("Foreign Key Constants problem");
      } else if (err.code == "ER_DUP_ENTRY") {
        return res.end("Duplicate Entry");
      }else {
      throw err;
    }
    } 
      // res.send(JSON.stringify(result));
      res.send("Successfully Submitted")
  }); 
});

router.put("/:id", function (req, res, next) {
  let courseID = Number(req.params.id);
  let courses = {
    courseID: req.body.courseID,
    courseName: req.body.courseName,
    programID: req.body.programID,
    semester: req.body.semester,
    yearID: req.body.yearID,
  };
 
  const sql = `UPDATE course SET courseID = ${courses.courseID}, courseName = ${courses.courseName}, programID = ${courses.programID}, semester = ${courses.semester}, yearID = ${courses.yearID} WHERE courseID = ${courseID};`;

  con.query(sql, function (err, result, fields) {

    // if (err.code === "ER_NO_REFERENCED_ROW_2") {
    //   return res.end("Foreign Key Constants problem");
    // }
    if (err) throw err;
    
    if (result.affectedRows === 0) return res.end("No Match");
    res.send("Successfully Updated");

  });
});

router.get("/", function (req, res, next) {

  const sql = `SELECT * FROM course; SELECT courseID, courseName FROM course`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    res.send(result);
  });
}); 

router.get("/:id", function (req, res, next) {
  let coursesID = Number(req.params.id);

  const sql = `SELECT * FROM course WHERE courseID = '${coursesID}';`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match course for individual course");
    res.send(result[0]);
  });
});
 
router.get("/lecturer/:id", function (req, res, next) {
  let lecturerID = Number(req.params.id);

  const sql = `SELECT courseID, courseName FROM lecturercourses WHERE lecturerID = ${lecturerID}`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0)
      return res.end("No Match course for Lecturer course");
    res.send(result);
  });
});  
module.exports = router;
