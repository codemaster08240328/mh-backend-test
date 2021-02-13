const cors = require("cors")
const helmet = require("helmet")
const session = require("express-session")

const secureApp = (app) => {

  /**
   * cors enabled for specific domain
   * const corsOptsion = {
   *  origin: "http://localhost"
   * }
  */

  const sessionOption = {
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }

  app.use(helmet()) // protect api from web vulnerabilites by setting HTTP headers.
  app.use(session(sessionOption)) // secure session
  app.use(cors()) // disable cors error
}

module.exports = secureApp
