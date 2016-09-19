"use strict"

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database("models/db/memo.db")
let models = {}

models.findAll = (callback) => {
  db.all("SELECT * FROM memos", function (err, data) {
    callback(data)
  })
}

models.insert = (req, callback) => {
  db.run(`INSERT INTO memos (memo, created_at) VALUES ("${req.body.text}", DATETIME("now"))`, function () {
    callback()
  })
}

models.delete = (req, callback) => {
  db.run(`DELETE FROM memos WHERE memo_id = ${req.body.memo_id}`, function () {
    callback()
  })
}

models.update = (req, callback) => {
  let arr = req.body.text.split("")
  let value = arr.slice(2, arr.length).join("");
  console.log(value);
  console.log(req.body.text[0]);
  db.run(`UPDATE memos SET memo='${value}' WHERE memo_id = ${req.body.text[0]}`, function () {
    callback()
  })
}

module.exports = models;
