var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


xhr.open('POST', 'http://localhost:1337/api/candidates/report', false);

xhr.send();
const fs = require('fs');
fs.writeFileSync('dataaaaaaa.xlsx', xhr.responseText, 'binary');
