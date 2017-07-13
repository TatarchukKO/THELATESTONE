const express = require('express');
const metaData = require('./server/routes/meta-data.js');
const candidate = require('./server/routes/candidates.js');
const bodyParser = require('body-parser');

const app = express();
app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/meta-data/', metaData);
app.use('/api/candidates/', candidate);


process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
