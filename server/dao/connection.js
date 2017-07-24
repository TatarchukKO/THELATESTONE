const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jhjkj87',
  database: 'pick_brains_db',
});

connection.connect((error) => {
  if (error) {
    console.log('Database connection error');
    throw error;
  }
  console.log('Connected to database');
});

module.exports = {
  connection,
};
