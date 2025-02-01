const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  },
});

module.exports = sessionMiddleware;
