const express = require('express');
const bodyParser = require('body-parser');
const metaData = require('./server/routes/meta-data.js');
const vacancy = require('./server/routes/vacancy.js');
const hrmFeedback = require('./server/routes/hrm-feedbacks.js');
const tsFeedback = require('./server/routes/ts-feedbacks.js');
const candidate = require('./server/routes/candidates.js');
const interview = require('./server/routes/interviews.js');
const authentication = require('./server/authentication/passport.js');
const cors = require('cors');

const app = express();

// authentication.init(app);

app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true,
}));

// app.use('/api/authentication/', authentication.router);

/* app.use((req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  } else {
    next();
  }
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  res.status(err.status).json(err);
  next();
});
app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/candidate/hrm-feedbacks/', hrmFeedback);
app.use('/api/candidate/ts-feedbacks/', tsFeedback);
app.use('/api/candidates/', candidate);
app.use('/api/interviews/', interview);

process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));

