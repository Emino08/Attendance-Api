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

 function gPassword() {
   let chars =
     "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let passwordLength = 12;
   let password = "";
   for (let i = 0; i <= passwordLength; i++) {
     let randomNumber = Math.floor(Math.random() * chars.length);
     password += chars.substring(randomNumber, randomNumber + 1);
   }
   return password;
 }
 let gpassword = gPassword();
  console.log(gpassword);
  
router.post("/", function (req, res, next) {
  let lecturer = {
    lecturerID: req.body.lecturerID,
    lecturerName: req.body.lecturerName,
    lecturerPhone: req.body.lecturerPhone,
    lecturerCourses: req.body.lecturerCourses,
  };


  const sql = `INSERT INTO lecturer (lecturerID,lecturerName,lecturerPhone) VALUES(${lecturer.lecturerID}, '${lecturer.lecturerName}', ${lecturer.lecturerPhone}); INSERT INTO login (userID,userPassword,userFingerprintID,usertype,fullname) VALUES(${lecturer.lecturerID}, '${"12345"}',${1},${2}, '${lecturer.lecturerName}');`;

  console.log(lecturer.lecturerCourses);
  let lecDetails = lecturer.lecturerCourses.map((item) => [lecturer.lecturerID, item.id, item.item])
  console.log(lecDetails);
  con.query(sql,function (err, result, fields) {
      // const sql1 = `INSERT INTO login (userID,userPassword,userFingerprintID,usertype,fullname) VALUES(${lecturer.lecturerID}, ${gpassword},${1},${2}, ${lecturer.lecturerName});`;
 
      // console.log(gpassword);
    const sql1 = `INSERT INTO lecturercourses (lecturerID,courseID,courseName) VALUES ?`;
      if (err) { 
        if (err.code == "ER_NO_REFERENCED_ROW_2") {
          return res.end("Foreign Key Constants problem");
        } else if (err.code == "ER_DUP_ENTRY") {
          return res.end("Duplicate Entry");
        } else {
          throw err;
        }
    } 
    

      //  con.query(sql1, function (err1, result1, fields1) {
      //  if (err1) throw err;
    
    con.query(sql1, [lecDetails], function (err1, result1, fields1) {

      if (err1) {
        if (err1.code == "ER_NO_REFERENCED_ROW_2") {
          return res.end("Lec Courses Foreign Key Constants problem");
        } else if (err1.code == "ER_DUP_ENTRY") {
          return res.end("Lec Courses Duplicate Entry");
        } else {
          throw err1;
        }
      }
      return res.send("Lecturer Successfully Registered");

    })


    }
  );
    // });
  
});  
    
router.put("/:id", function (req, res, next) {
  let lecturerID = Number(req.params.id);
  let lecturer = {
    lecturerID: req.body.lecturerID,
    lecturerName: req.body.lecturerName,
    lecturerPhone: req.body.lecturerPhone,
    lecturerCourses: req.body.lecturerCourses,
  };

  const sql = `UPDATE lecturer SET lecturerID = ${lecturer.lecturerID}, lecturerName = '${lecturer.lecturerName}', lecturerPhone = ${lecturer.lecturerPhone} WHERE lecturerID = ${lecturerID};`;

// const sql1 = `INSERT INTO lecturercourses (courseName, lecturerID, courseID) VALUES ? ON DUPLICATE KEY UPDATE courseName=VALUES(courseName), courseID=VALUES(courseID)`;

//    let lecDetails = lecturer.lecturerCourses.map((item) => [
//      lecturer.lecturerID,
//      item.id,
//      item.item,
//    ]);
//   console.log(lecDetails);
  
  con.query(sql, function (err, result, fields) {
    // if (err.code === "ER_NO_REFERENCED_ROW_2") {
    //   return res.end("Foreign Key Constants problem");
    // }
    if (err) throw err;

    if (result.affectedRows === 0) return res.end("No Match");

    
    // con.query(sql1, [lecDetails], function (err1, result1, fields1) {
    //   if (err1) {
    //     if (err1.code == "ER_NO_REFERENCED_ROW_2") {
    //       return res.end("Lec Courses Foreign Key Constants problem");
    //     } else if (err1.code == "ER_DUP_ENTRY") {
    //       return res.end("Lec Courses Duplicate Entry");
    //     } else {
    //       throw err1;0.. c
    //     }
    //   } 
      return res.send("Lecturer Successfully Updated");
    // });
 
  });
});

router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM lecturer;`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    res.send(result);
  });
});

router.get("/:id", function (req, res, next) {
  let lecturerID = Number(req.params.id);

  const sql = `SELECT * FROM lecturer WHERE lecturerID = '${lecturerID}';`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match");
    res.send(result[0]);
  });
});

router.get("/fingerprint/:id", function (req, res, next) {
  let lecturerID = Number(req.params.id);

  const sql = `SELECT * FROM login WHERE userFingerprintID = '${lecturerID}';`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No FingerprintID found");
    res.send(result[0]);
  });
});

//Lecturer Courses
 
router.post("/courses", function (req, res, next) {
  let lecturercourses = {
    lecturerID: req.body.lecturerID,
    courseID: req.body.courseID,
    courseName: req.body.courseName,
  };

  const sql = `INSERT INTO lecturercourses (lecturerID,courseID,courseName) VALUES(${lecturercourses.lecturerID}, ${lecturercourses.courseID}, '${lecturercourses.courseName}');`;

  con.query(sql, function (err, result, fields) {
    // pseudo code
    // we are simply ignoring it

    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2") {
        return res.end("Foreign Key Constants problem");
      } else if (err.code == "ER_DUP_ENTRY") {
        return res.end("Duplicate Entry");
      } else {
        throw err;
      }
    }
    return res.send(JSON.stringify(result));
  });
});

// Course Name should be here
router.put("/courses/:lecturerid/:courseid", function (req, res, next) {
   
    let lecturerid = req.params.lecturerid
    let courseid = req.params.courseid

  let lecturercourses = {
    lecturerID: req.body.lecturerID,
    courseID: req.body.courseID,
  };

  const sql = `UPDATE lecturercourses SET lecturerID = ${lecturercourses.lecturerID}, courseID = ${lecturercourses.courseID} WHERE lecturerID = ${lecturerid} AND courseID = ${courseid};`;

  con.query(sql, function (err, result, fields) {
    // pseudo code
    // we are simply ignoring it

    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2") {
        return res.end("Foreign Key Constants problem");
      } else if (err.code == "ER_DUP_ENTRY") {
        return res.end("Duplicate Entry");
      } else {
        throw err;
      }
    }
    return res.send(JSON.stringify(result));
  });
}); 
                     
router.get("/courses/:lecturerid", function (req, res, next) {
  let lecturerID = Number(req.params.lecturerid);

  const sql = `SELECT courseID, courseName FROM lecturercourses WHERE lecturerID = '${lecturerID}'; SELECT * FROM lecturer WHERE lecturerid = '${lecturerID}';`;
             con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match");
    res.send(result);
  }); 
});     
             
router.get("/courses/:lecturerid/:year/:program", function (req, res, next) {
  let lecturerID = Number(req.params.lecturerid);
  let yearID = Number(req.params.year)
  let programID = Number(req.params.program);

  const sql = `SELECT course.courseID, course.courseName FROM course
   INNER JOIN lecturercourses
    WHERE course.courseID = lecturercourses.courseID AND course.yearID = ${yearID} AND lecturercourses.lecturerID = ${lecturerID} AND course.programID = ${programID};`;
             con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) return res.end("No Match");
    res.send(result);
  }); 
});   
    
   
router.get("/courses/student/:student", function (req, res, next) {
  let attendanceid = Number(req.params.student);

  const sql = `SELECT * FROM student WHERE studentID = '${attendanceid}';`;
  let student = {};
  let student1 = {};
  let today = new Date();         
  let date =
    today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
  let time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
  let attendance = '';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;      
    if (result.length === 0) return res.end("No student found");
    student = {...result[0]};
    // res.end(student); 
                    
    let year = student.yearID;
    let program = student.programID;
    let sql1 = `SELECT * FROM course WHERE programID = ${program} AND yearID = ${year}`;
    con.query(sql1, function (err1, result1, fields1) {
      if (err1) throw err1;
      if (result1.length === 0){attendance = "0"; return res.end("Not part of the course");}  
      student1 = { ...result1[0] }
      // if(result1.length > 1){attendance = "Yes"}
      attendance = `1`;
      
      // res.send(true);
    //   console.log(time);
    // console.log(date);
    // console.log(attendance);   
    // console.log(student.studentID);
    //   console.log(student1.courseID);
   
       let sql2 = `INSERT INTO attendance (studentID, attendance, date, time) VALUES(${attendanceid}, ${attendance}, ${date}, ${time})`;
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
      
      res.send("Inserted");
      
    console.log(result2.affectedRows);
    });
      
      // console.log(JSON.stringify(student) + " " + JSON.stringify(student1));
    })
     

  });
});  

module.exports = router;
