const mysql = require('mysql');

const connection = mysql.createConnection({
  // host: 'mysql5.gear.host',
  // user: 'pickbrainsdb',
  // password: 'Ko09GB6-o1!o',
  // database: 'pickbrainsdb',
  // timezone: 'utc',
  host: 'localhost',
  user: 'root',
  password: '123789',
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
