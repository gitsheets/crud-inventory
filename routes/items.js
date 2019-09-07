var express = require('express');
const mysql = require ('mysql');
var app = express();




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory'
});


app.get('/', function(req, res) {  
    mysqlConnection.query('Select * from items', (err, rows, fields) => 
    {
        if(!err)
        res.render('index', { 
            data: rows
         });
        else
        console.log(err);
});

});

module.exports = app;
// app.get('/',function(req, res,next){
//     req.getConnections(function(error,conn){
//         conn.query('Select * from items', function(err, rows, fields){
//             if(err){
//                 req.flash('error',err);
//                 res.render('items.list',{
//                     title: 'Item list',
//                     data: ''
//                 })
//             }else{
//                 res.render('items/list ',{
//                     title: 'Item List',
//                     data: rows
//                 })
//             }
//         })
//     })
// })

// app.get()