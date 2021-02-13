const controller = require("../controller")

const {
  getInvestmentHandler,
  exportInvestmentByIdHandler,
  exportAllInvestmentsHandler,
} = controller


const apiRoutes = (app) => {
  app.get("/investments/:id", getInvestmentHandler)
  app.post("/investments/export/:investmentId", exportInvestmentByIdHandler)
  app.post("/investments/export", exportAllInvestmentsHandler)
}

module.exports = apiRoutes
