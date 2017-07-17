const express = require('express');
const bodyParser = require('body-parser');


const metaData = require('./server/routes/meta-data.js');
const vacancy = require('./server/routes/vacancy.js');
const candidate = require('./server/routes/candidate.js');

const app = express();
const port = 1337;

app.listen(port, () => console.log(`listening port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/candidates/', candidate);
