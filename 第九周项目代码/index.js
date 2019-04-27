var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.static(__dirname));

app.get("/singupAccount", function(req, res) {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs",
    port: "3306"
  });

  connection.connect();

  var response = {
    name: req.query.name,
    password: req.query.password,
    email: req.query.email
  };

  var addSql =
    "INSERT INTO user_table(user_name, user_password,user_email) VALUES(?,?,?)";
  var addSqlParams = [response.name, response.password, response.email];

  connection.query(addSql, addSqlParams, function(err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      res.send("执行sql出错!");
      return;
    }
    res.send("Welcome~ SingUp Success ^_^");
  });

  connection.end();
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
