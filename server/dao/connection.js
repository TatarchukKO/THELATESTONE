const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jhjkj87',
  database: 'pickbrainsdb',
  timezone: 'utc',
});

function init(callback) {
  connection.connect((error) => {
    if (error) {
      console.log('Database connection error');
    } else {
      console.log('Connected to database');
    }
    callback(error);
  });
}

module.exports = {
  init,
  connection,
};
