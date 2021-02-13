const controller = require("./controller")

const {
  getInvestmentHandler,
  exportInvestmentHandler,
} = controller


const apiRoutes = (app) => {
  app.get("/investments/:id", getInvestmentHandler)
  app.post("/investments/export/:investmentId", exportInvestmentHandler)
}

module.exports = {
  apiRoutes,
}
