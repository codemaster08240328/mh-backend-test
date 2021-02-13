const controller = require("./controller")

const {
  getInvestmentHandler,
} = controller


const apiRoutes = (app) => {
  app.get("/investments/:id", getInvestmentHandler)
}

module.exports = {
  apiRoutes,
}
