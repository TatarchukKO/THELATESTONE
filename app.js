const express = require('express');
const mysql = require('mysql');
const metaData = require('./server/routes/meta-data.js');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123789',
  database: 'pick_brains_db',
});
connection.connect((error) => {
  if (error) {
    console.log('error');
    throw error;
  }
  console.log('Successfull connection to the server');
});

app.use('/api/meta-data/', metaData);

app.listen(1337);
