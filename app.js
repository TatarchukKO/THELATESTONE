const express = require('express');
const mysql = require('mysql');
const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123789',
    database: 'pick_brains_db'
});

connection.connect((error) => {
    error ? console.log('Error') : console.log('Successfull connection to data base');
})

app.listen(3000);