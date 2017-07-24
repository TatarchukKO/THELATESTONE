const express = require('express');
const bodyParser = require('body-parser');
const metaData = require('./server/routes/meta-data.js');
const vacancy = require('./server/routes/vacancy.js');
const hrmFeedback = require('./server/routes/hrm-feedbacks.js');
const tsFeedback = require('./server/routes/ts-feedbacks.js');
const candidate = require('./server/routes/candidates.js');
const cors = require('cors');

const app = express();
app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/candidates/', candidate);
app.use('/api/candidate/hrm-feedbacks/', hrmFeedback);
app.use('/api/candidate/ts-feedbacks/', tsFeedback);

process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));

