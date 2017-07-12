const express = require('express');
const vacancy = require('./server/routes/vacancy.js');
const candidate = require('./server/routes/candidate.js');

const app = express();
const port = 1337;

app.listen(port, () => console.log(`listening port ${port}`));

app.use('/api/candidates/', candidate);

app.use('/api/vacancies/', vacancy);
