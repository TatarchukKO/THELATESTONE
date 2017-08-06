const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const async = require('async');

const interview = require('./server/routes/interviews');
const notification = require('./server/routes/notification');
const tsFeedback = require('./server/routes/ts-feedbacks');
const connection = require('./server/dao/connection');
const trieSearch = require('./server/services/trie-search');
const metaData = require('./server/routes/meta-data');
const vacancy = require('./server/routes/vacancy');
const generalHistory = require('./server/routes/general-history');
const hrmFeedback = require('./server/routes/hrm-feedbacks');
const candidate = require('./server/routes/candidates');
const authentication = require('./server/authentication/passport');
const users = require('./server/routes/users');
const utils = require('./utils');

const app = express();

authentication.init(app);

app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use('/api/authentication/', authentication.router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/user', (req, res) => {
  const user = req.user;
  delete user.id;
  delete user.login;
  res.status(200).send(utils.toCamel(user));
});
app.use('/api/interviews/', interview);
app.use('/api/notification/', notification);
app.use('/api/candidate/ts-feedbacks/', tsFeedback);

app.use('/api/users', users);
app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/history/', generalHistory);
app.use('/api/candidate/hrm-feedbacks/', hrmFeedback);
app.use('/api/candidates/', candidate);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json(err);
  next();
});
process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

async.series([
  connection.init,
  trieSearch.init,
], (error) => {
  if (error) {
    throw error;
  }
  app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
});
