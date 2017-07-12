const mysql = require('mysql');
const metaDataQuery = require('./meta-data-queries.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
  database: 'pick_brains_db',
});

connection.connect((error) => {
  if (error) {
    console.log('No connection!');
    throw error;
  }
  console.log('Db connected');
});


exports.getEnglishLevels = (callback) => {
  connection.query(metaDataQuery.englishLevelsQuery, callback);
};
