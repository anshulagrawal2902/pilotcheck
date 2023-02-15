const express = require("express");
const app = express();
const mysql = require("mysql2");
const config = require("../config");

var con =  mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
    else console.log("connected db");
});

var dbRouter = express.Router();

module.exports = dbRouter