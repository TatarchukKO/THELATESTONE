const express = require('express');
const metaData = require('./server/routes/meta-data.js');
const candidate = require('./server/routes/candidates.js');
const bodyParser = require('body-parser');
const authentication = require('./server/authentication/passport.js');

const app = express();
authentication.init(app);
app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/meta-data/', metaData);
app.use('/api/candidates/', candidate);
app.use('/api/authentication/', authentication.router);

process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
