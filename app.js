const express = require('express');
const bodyParser = require('body-parser');
const metaData = require('./server/routes/meta-data.js');
const vacancy = require('./server/routes/vacancy.js');
const candidate = require('./server/routes/candidate.js');
const hrmFeedback = require('./server/routes/hrm-feedbacks.js');
const tsFeedback = require('./server/routes/ts-feedbacks.js');

const app = express();
const port = 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/candidates/', candidate);
app.use('/api/candidate/hrm-feedbacks/', hrmFeedback);
app.use('/api/candidate/ts-feedbacks/', tsFeedback);

process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(port, () => console.log(`listening port ${port}`));

