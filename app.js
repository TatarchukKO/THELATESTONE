const express = require('express');
const bodyParser = require('body-parser');


const metaData = require('./server/routes/meta-data.js');
<<<<<<< HEAD
const candidate = require('./server/routes/candidates.js');
const bodyParser = require('body-parser');
const authentication = require('./server/authentication/passport.js');

const app = express();
authentication.init(app);
app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/authentication/', authentication.router);
app.use((req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  } else {
    next();
  }
});
=======
const vacancy = require('./server/routes/vacancy.js');
const candidate = require('./server/routes/candidate.js');

const app = express();
const port = 1337;

app.listen(port, () => console.log(`listening port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

>>>>>>> f2cb199d8f935f40e321b48b82a0e136caf1750b
app.use('/api/meta-data/', metaData);
app.use('/api/vacancies/', vacancy);
app.use('/api/candidates/', candidate);
<<<<<<< HEAD

process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
=======
>>>>>>> f2cb199d8f935f40e321b48b82a0e136caf1750b
