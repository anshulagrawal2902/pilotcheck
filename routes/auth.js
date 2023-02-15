var express = require('express');
var passport = require("passport");
var LocalStrategy = require("passport-local");
const app = express();
const config = require("../config");
const mysql = require("mysql2");
var con = mysql.createConnection(config);

var router = express.Router();
  
con.connect(function (err) {
    if (err) throw err;
    else console.log("connected");
});


passport.use(new LocalStrategy(function verify(username, password, cb) {
    console.log(username)
    console.log(password)

    con.query(
        "SELECT * FROM store_login WHERE store_id  = ?",
        [username],
        function (err, result) {
          console.log(result);
          if (err) {
            return cb(err);
          }
          if (result.length == 0) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          if (result[0].password != [password])
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          return cb(null, result);
        }
      );
  }));


  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      console.log(user);
      return cb(null, {
        id: user[0].store_id,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    console.log(user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  router.get('/login', function(req, res, next) {
    res.render('login');
  });

  router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

  router.get("/home", (req, res)=>{
    if(req.isAuthenticated()){
      res.render("home")
    }
    else res.redirect("/login")
  })

  module.exports = router

