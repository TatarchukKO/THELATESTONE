const express = require('express');
const metaData = require('./server/routes/meta-data.js');
const candidate = require('./server/routes/candidate.js');

const app = express();

app.use('/api/meta-data/', metaData);
app.use('/api/candidates/', candidate);

app.listen(1337);
