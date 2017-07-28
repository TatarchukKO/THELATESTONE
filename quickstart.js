const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');

// If modifying these scopes, devare your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}calendar-nodejs-quickstart.json`;
console.log(TOKEN_PATH);

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) {
    console.log(`Error loading client secret file: ${err}`);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${TOKEN_PATH}`);
}
let date = new Date();
date.setDate(30);
date = date.toISOString();
console.log(date);

const event = {
  summary: 'ПИДОР',
  location: '800 Howard St., San Francisco, CA 94103',
  description: 'A chance to hear more about Google\'s developer products.',
  start: {
    dateTime: date, // '2017-07-30 15:00:00',
    timeZone: 'Europe/Minsk',
  },
  end: {
    dateTime: date, // '2017-07-30T17:00:00-07:00',
    timeZone: 'Europe/Minsk',
  },
};

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar('v3');
  calendar.events.insert({
    auth,
    calendarId: 'maxaderiha@gmail.com',
    resource: event,
  }, (err) => {
    if (err) {
      console.log('SHIET');
      console.log(err);
      return;
    }
    console.log('WP, DAD');
  });
}
