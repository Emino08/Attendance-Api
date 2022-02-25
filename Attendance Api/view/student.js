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
  let student = {
    studentID: req.body.studentID,
    studentName: req.body.studentName,
    studentEmail: req.body.studentEmail,
    studentPhone: req.body.studentPhone,
    programID: req.body.programID,
    yearID: req.body.yearID,
    sfingerprintID: req.body.sfingerprintID,
  }; 
              
  const sql = `INSERT INTO student (studentID,studentName,programID,studentEmail,studentPhone,yearID,sfingerprintID) VALUES(${student.studentID}, '${student.studentName}', ${student.programID}, '${student.studentEmail}', ${student.studentPhone}, ${student.yearID}, ${student.sfingerprintID});`;
 
  con.query(sql, function (err, result, fields) {
    // pseudo code
      // we are simply ignoring it
        
      if (err) { 
          if (err.code == "ER_NO_REFERENCED_ROW_2") {
              return res.end("Foreign Key Constants problem");
          }
          else if (err.code == "ER_DUP_ENTRY") {
              return res.end("Duplicate Entry"); 
          } else {
              throw err;  
          } 
      }  
         return res.send("Successfully Registered");   
  });
});   
 
router.put("/:id", function (req, res, next) {
  let studentID = Number(req.params.id);
  let student = {
    studentID: req.body.studentID,
    studentName: req.body.studentName,
    studentEmail: req.body.studentEmail,
    studentPhone: req.body.studentPhone,
    programID: req.body.programID,
    yearID: req.body.yearID,
  };   

  const sql = `UPDATE student SET studentID = ${student.studentID}, studentName = '${student.studentName}', programID = ${student.programID}, studentEmail = '${student.studentEmail}', studentPhone = ${student.studentPhone}, yearID = ${student.yearID} WHERE studentID = ${studentID};`;

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
  const sql = `SELECT * FROM student;`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    res.send(result);
  });
}); 
     
router.get("/lastindex", function (req, res, next) {
  // const sql = `SELECT * FROM student;`;
  const sql = `SELECT * FROM student ORDER BY sfingerprintID DESC LIMIT 1;`;
 
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    res.send(result);
  });
}); 

router.get("/:id", function (req, res, next) {
  let studentID = Number(req.params.id);

  const sql = `SELECT * FROM student WHERE studentID = '${studentID}';SELECT * FROM attendance WHERE studentID = '${studentID}'`;
let obj = []
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match");
     
    obj[0] = result[0];  
    obj[1] = result[1] 
    res.send(obj);  
  }); 
});     
   
router.get("/:id/courses/:programid/:year", function (req, res, next) {
    let studentID = Number(req.params.id);
    let programID = Number(req.params.programid)
    let year = Number(req.params.year)

      
  const sql = `SELECT * FROM course WHERE yearID = ${year} AND programID = ${programID};`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match");
    res.send(result);
  });
}); 
module.exports = router;
