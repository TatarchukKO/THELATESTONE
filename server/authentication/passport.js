const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const connection = require('../dao/connection.js').connection;
const validate = require('express-validation');
const validation = require('../validation/authentication.js');

const router = express.Router();

const options = {
  // host: 'mysql5.gear.host',
  // user: 'pickbrainsdb',
  // password: 'Ko09GB6-o1!o',
  // database: 'pickbrainsdb',
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
  database: 'pickbrainsdb',
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
    WHERE ?`, { login: login.toLocaleLowerCase() }, (error, res) => {
      const user = res[0];
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: 'No such user.' });
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
  connection.query(`SELECT id, login, type, first_name, second_name FROM users
  WHERE users.id = ${id}`, (error, res) => {
    done(error, res[0]);
  });
});

router.post('/login', validate(validation.login), (req, res) => {
  passport.authenticate('local', (autError, user, result) => {
    if (autError) {
      return res.status(500).send(autError.message);
    }
    if (!user) {
      return res.status(400).send(result.message);
    }

    req.logIn(user, (logError) => {
      if (logError) {
        return res.status(403).send(logError.message);
      }
      res.status(202).end();
    });
  })(req, res);
});

router.post('/exit', validate(validation.exit), (req, res) => {
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
