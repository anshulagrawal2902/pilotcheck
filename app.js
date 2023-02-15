const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const router = require('./routes/auth');
const authRouter = router;


app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/views'))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false ,
        maxAge:1000000000}
  }));

app.use(passport.authenticate('session'));

app.use('/', authRouter);

const PORT = 4100;
app.listen(PORT, ()=>{
    console.log(`listening at http://localhost:${PORT}`)
})
