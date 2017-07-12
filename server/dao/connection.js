const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123789',
  database: 'pick_brains_db',
});

connection.connect((error) => {
  if (error) {
    console.log('Models connection error');
    throw error;
  }
  console.log('Models is connected');
});

exports.connection = connection;
