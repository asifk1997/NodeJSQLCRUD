const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : '--',
    password: '--',
    database: 'employeedb'
});

mysqlConnection.connect((err)=>{
    if (!err)
    {
        console.log("Db connection succeeded");
    }
    else
    {
        console.log("DB connection failed \n Error: "+JSON.stringify(err,undefined,2));
    }
})

app.listen(3000,()=>console.log('Express server is running at port 3000'));

app.get('/employees',(req,res)=>
{
    mysqlConnection.query('SELECT * From employee',(err,rows,fields)=>
    {
        if (!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});