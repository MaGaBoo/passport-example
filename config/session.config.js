const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const { DB } = require('./db.config');

const sessionMaxAge = process.env.SESSION_AGE || 7

const sessionConfig = expressSession({
  secret: process.env.COOKIE_SECRET || 'Super mega secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    maxAge: 24 * 3600 * 1000 * sessionMaxAge,
    httpOnly: true
  },
  store: new MongoStore({
    mongoUrl: DB,
    ttl: 24 * 3600 * sessionMaxAge,
  })
})

module.exports = sessionConfig;