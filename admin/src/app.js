const express = require("express")
const bodyParser = require("body-parser")
const secureApp = require("./secure")
const {
  apiRoutes,
} = require("./routes")

const app = express()
app.use(bodyParser.json({limit: "10mb"}))

secureApp(app)
apiRoutes(app)

module.exports = app
