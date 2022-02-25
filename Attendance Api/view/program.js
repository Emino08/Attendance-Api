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
  let program = {
    programID: req.body.programID,
    programName: req.body.programName
  }
  
 const sql = `INSERT INTO program (programID, programName) VALUES(${program.programID}, ${program.programName});`;

  con.query(sql, function (err, result, fields) {
    // pseudo code
    // we are simply ignoring it
    if (err.code  == "ER_DUP_ENTRY") {
      res.end("Item already exist")
    } 
    if (err) throw err;
    if (err.code === null)
      res.send(JSON.stringify(result));
  });
});

router.put("/:id", function (req, res, next) {

  let programID = Number(req.params.id);
  let program = {
    programID: req.body.programID,
    programName: req.body.programName,
  };

  const sql = `UPDATE program SET programID = ${program.programID},  programName = ${program.programName} WHERE programID = ${programID};`;

  con.query(sql, function (err, result, fields) {
   
    if (err) throw err;
    if (result.affectedRows === 0) return res.end("No Match");
    res.send("Successfully Updated");
  });
});

router.get("/", function (req, res, next) {
  let programID = Number(req.params.id);
  

  const sql = `SELECT * FROM program;`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    if (result.length === 0) return res.end("No Match");
    
    res.send(result);
  });
});

router.get("/:id", function (req, res, next) {
  let programID = Number(req.params.id);

  const sql = `SELECT * FROM program WHERE programID = '${programID}';`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // if (result.affectedRows === 0) return res.end("No Match");
    if (result.length === 0) return res.end("No Match program for an individual lecturer");
    res.send(result);
  });
});
module.exports = router;
