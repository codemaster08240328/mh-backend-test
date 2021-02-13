const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require("config")
const routes = require("./route")

const {
  apiRoutes,
} = routes

const app = express()

/**
 * cors enabled for specific domain
 * const corsOptsion = {
 *  origin: "http://localhost"
 * }
*/

app.use(cors())
app.use(bodyParser.json({limit: "10mb"}))

apiRoutes(app)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
