const mysql = require ('mysql');
const express = require ('express');
const bodyparser = require('body-parser');
const {check, validationResult} = require('express-validator');
var methodOverride = require('method-override');
var app = express();

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded');
    else
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.set('view engine', 'ejs');

var index = require('./routes/index');
var items = require('./routes/items');


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(methodOverride(function (req,res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

app.use(cookieParser('keyboard1'));
app.use(expressSession({
    secret: 'keyboard1',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
}));

app.use(express.static('public'));

app.use(flash());

app.use('/',index);

app.listen(3000,() => console.log('Express server is running at port no : 3000'));




