const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const connection = require('../dao/connection.js').connection;

const router = express.Router();

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'jhjkj87',
  database: 'pick_brains_db',
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};
const sessionStore = new MySQLStore(options);

function init(app) {
  app.use(session({
    secret: 'SourCat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'sid',
    cookie: { maxAge: 86400000 },
    store: sessionStore,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password' },
  (login, password, done) => {
    connection.query(`SELECT users.id, login, password FROM users
    WHERE login = "${login}"`, (error, res) => {
      const user = res[0];
      if (error) {
        throw error;
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  connection.query(`SELECT id, login, password, type, first_name, second_name FROM users
  WHERE users.id = ${id}`, (error, res) => {
    done(error, res[0]);
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (autError, user) => {
    if (autError) {
      res.send(autError.message);
      throw autError;
    }
    if (!user) {
      res.send('Authorization Error');
      return;
    }

    req.logIn(user, (logError) => {
      if (logError) {
        res.send(logError.message);
        throw logError;
      }
      res.end();
    });
  })(req, res);
});

router.post('/exit', (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      res.send(err.message);
      throw err;
    }
    res.end();
  });
});

module.exports = {
  router,
  init,
};
