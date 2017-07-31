const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'mysql5.gear.host',
//   user: 'pickbrainsdb',
//   password: 'Ko09GB6-o1!o',
//   database: 'pickbrainsdb',
// });
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123789',
  database: 'pickbrainsdb',
});

function init(callback){
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
