const sqlite = require("sqlite3").verbose();
let file = "db/app.db";
let db = new sqlite.Database(file);
let models = {};

models.findAll = function(callback){
  db.all("SELECT * FROM memos ORDER BY id DESC", function(err, data){
    callback(data);
  });
}

models.update = function(id, text, callback){
  db.run("UPDATE memos SET text = $text WHERE id = $id", { $id:id, $text:text }, function(err){
    if(err) return false;
    else callback();
  });
}

models.delete = function(id, callback){
  db.run("DELETE FROM memos WHERE id = $id", { $id:id }, function(err){
    if(err) return false;
    else callback();
  });
}

models.create = function(text, callback){
  db.run("INSERT INTO memos (text) VALUES ($text)", {$text:text}, function(err){
    if(err) return false;
    else callback()
  });
}

module.exports = models;
