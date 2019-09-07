var express = require('express');
const mysql = require ('mysql');

const {check, validationResult} = require('express-validator');
var app = express();


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory'
});

app.get('/', function(req, res){
    mysqlConnection.query('Select * from items', (err, rows, fields) => 
    {
        if(!err)
        res.render('index', {
            result: '',
            data: rows
         });
        else
        console.log(err);
});
});


app.get('/add', function(req, res, next){
    res.render('items/add',{
        title: 'Add new user',
        name: '',
        quantity: '',
        amount: '',
        message: ''
    });
});

app.post('/add', function(req, res, next){

    var errors = validationResult(req);
    var item = {
        name: req.body.name,
        qty: req.body.qty,
        amount: req.body.amount
    }
    mysqlConnection.query('Insert into items set ?', item, (err, rows, fields) => 
        {
        if(!err){
           res.render('items/add', {
               message: 'success'
           })
        }
        else
            console.log(err);
    });
   

});


app.post('/delete', function(req, res, next){
    mysqlConnection.query('delete from items where id = ?', [req.body.delete], (err, rows, fields) => 
        {
        if(!err){
            mysqlConnection.query('Select * from items', (error, rws, flds) => 
                {
                    if(!error)
                    res.render('index', {
                        result: 'Succesfully deleted!',
                        data: rws
                    });
                    else
                    console.log(error);
            });
        }
        else
            console.log(err);
    });
});

app.post('/openupdate', function(req, res, next){
    mysqlConnection.query('Select * from items where id = ?',[req.body.update], (error, rws, flds) => 
    {
        if(!error)
        res.render('items/update',{
            result: '',
            data: rws
        });
        else
        console.log(error);
    });
})


app.post('/update', function(req, res, next){

    var item = {
        name: req.body.name,
        qty: req.body.quantity,
        amount: req.body.amount
    }

    mysqlConnection.query('update items set ? where id = '+ req.body.update, item, (error, rws, flds) => 
    {
        if(!error){
            mysqlConnection.query('select * from items', (err, rows, fields) => 
            {
                if(!err)
                res.render('index', {
                    result: 'Sucessfull updated!',
                    data: rows
                })
                else
                console.log(err);
            });
        }
        else
        console.log(error);
    })
})


module.exports = app;