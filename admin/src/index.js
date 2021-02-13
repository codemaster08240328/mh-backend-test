const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")

const secureApp = require("./secure")
const {
  apiRoutes,
} = require("./route")

const app = express()
app.use(bodyParser.json({limit: "10mb"}))

secureApp(app)
apiRoutes(app)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
