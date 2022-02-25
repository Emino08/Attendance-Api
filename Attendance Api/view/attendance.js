var express = require("express");
var router = express.Router();
let mysql = require("mysql");
const { JSON } = require("mysql/lib/protocol/constants/types");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
  multipleStatements: true,
});

router.get("/:attendceID/:courseID", function (req, res, next) {
  let attendanceid = Number(req.params.attendceID);
  let courseid = Number(req.params.courseID);
// console.log(courseid);
  const sql = `SELECT * FROM student WHERE sfingerprintID = ${attendanceid};`;
  console.log("AttendanceiD" + attendanceid);
  let student = {};
  let student2 = null;
  let student1 = {};
  let today = new Date();   
  let date =
    today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
  let time =
    today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
  let attendance = "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Fingerprint found");
    student = { ...result[0] };
    student2 = student["studentID"];
    // console.log(student2);
    // res.send(student);    

const sql3 = `SELECT * FROM student WHERE studentID = '${student2}';`;
    con.query(sql3, function (err3, result3, fields) {
      if (err3) throw err3; 
      if (result3.length === 0) return res.end("No Record found");
      student1 = { ...result3[0] };
      // console.log(student1);
      // res.send(student1);
    //   let year = student.yearID;
    //   let program = student.programID;
    //   let sql1 = `SELECT * FROM course WHERE programID = ${program} AND yearID = ${year}`;
    //   con.query(sql1, function (err1, result1, fields1) {
    //     if (err1) throw err1;
    //     if (result1.length === 0) {
    //       attendance = "0";
    //       return res.end("Not part of the course");
    //     }
    //     student1 = { ...result1[0] };
    //     // if(result1.length > 1){attendance = "Yes"}
        attendance = `1`;  
         
        let sql2 = `INSERT INTO attendance (studentID, attendance, courseID, date, time) VALUES(${student2}, ${attendance}, ${courseid}, ${date}, ${time})`;
        con.query(sql2, function (err2, result2, fields2) {
          if (err2) {
            if (err2.code == "ER_NO_REFERENCED_ROW_2") {
              return res.end("Foreign Key Constants problem");
            } else if (err2.code == "ER_DUP_ENTRY") {
              return res.end("Duplicate Entry");
            } else {
              throw err2;
            }
          }
          if (result2.length === 0) return res.end("Not Inserted");

          res.send({sName: student1.studentName,date,time});

          // console.log(result2.affectedRows);
        });

    //     // console.log(JSON.stringify(student) + " " + JSON.stringify(student1));
    //   });
  
    })
  });
});
 
// Get the students attendance from a class by date
router.get("/class/:date/:courseID", function (req, res, next) {
  let dateTime = Number(req.params.date);
  // console.log(datetime);
  let courseid = Number(req.params.courseID);
  // console.log(courseid);
  const sql = `SELECT attendance.studentID, student.studentName, attendance.time, programcourses.programID FROM attendance
  INNER JOIN programcourses
   ON attendance.date = ${dateTime} AND programcourses.courseID = ${courseid} 
   INNER JOIN student WHERE student.studentID = attendance.studentID;SELECT programcourses.courseID, student.studentID,student.studentName, student.programID
FROM student
INNER JOIN programcourses
WHERE student.programID = programcourses.programID AND programcourses.courseID = ${courseid};`;
   
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Attendance found");
//  const re3 = [];
// const map1 = new Map();
// for (const item of result[0]) {
//   if (!map1.has(item.studentID)) {
//     map.set(item.studentID, true); // set any value to Map
//     re3.push({
//       studentID: item.studentID,
//       name: item.studentName,
//       attended: "Yes"
//     });
//   }
//     }
 
    let arr = [...result[0]]
    
    for (let index = 0; index < arr.length; index++) {
      
     arr[index].attended = "yes";
      
    }
    
    // console.log(arr);

    console.log(result[0]);
    let data = [];
    data = arr.concat(result[1])

// res.send(result[1]);
    // const unique = [...new Set(data.map(item => item.studentID))]; 
    // res.send(unique);
    // Unique list of student attendance
const r3 = [];
const map = new Map();
for (const item of data) {
  if (!map.has(item.studentID)) {
    map.set(item.studentID, true); // set any value to Map
    r3.push({
      studentID: item.studentID,
      name: item.studentName,
      attended: item.attended ? "Yes" : "No",
      time:item.time
    });
  }
    } 
    res.send(r3);
// console.log(r3);
    
    // const sql3 = `SELECT studentName, programID, yearID FROM student WHERE studentID IN '?';`;
    // con.query(sql3, function (err3, result3, fields) {
    //   if (err3) throw err3;
    //   if (result3.length === 0) return res.end("No Record found");
    //   student1 = { ...result3[0] }; 
  
    //   attendance = `1`;
  
    //   let sql2 = `INSERT INTO attendance (studentID, attendance, courseID, date, time) VALUES(${student2}, ${attendance}, ${courseid}, ${date}, ${time})`;
    //   con.query(sql2, function (err2, result2, fields2) {
    //     if (err2) {
    //       if (err2.code == "ER_NO_REFERENCED_ROW_2") {
    //         return res.end("Foreign Key Constants problem");
    //       } else if (err2.code == "ER_DUP_ENTRY") {
    //         return res.end("Duplicate Entry");
    //       } else {
    //         throw err2;
    //       }
    //     }
    //     if (result2.length === 0) return res.end("Not Inserted");

    //     res.send({ sName: student1.studentName, date, time });

    //     // console.log(result2.affectedRows);
    //   });

    //   //     // console.log(JSON.stringify(student) + " " + JSON.stringify(student1));
    //   //   });
    // });
  });
});

router.get("/:courseID", function (req, res, next) {
  let courseid = Number(req.params.courseID);
  // const sql = `SELECT * FROM student;`;
  const sql = `SELECT DISTINCT date from attendance WHERE courseID = ${courseid}; SELECT lecturerID FROM lecturercourses WHERE courseID = ${courseid}`;
// const sql = `SELECT date FROM attendance GROUP BY date HAVING COUNT(date) = 1`;
  let obj = []
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");

    let data = result[1][0].lecturerID;
    let data1 = result[0];
    // console.log(data1);
    console.log(data1);

    const sql1 = `SELECT * FROM lecturer WHERE lecturerID = ${data}`;

     con.query(sql1, function (err1, result1, fields1) {
       if (err1) throw err1;

      obj.push(data1)
      //  res.send(real); 
       obj.push(result1[0]) 
       res.send(obj)
    //   console.log(obj);
    // res.write("2");
     })
   
    // res.send(JSON.stringify(data));
  }); 
});  
 
module.exports = router;
 