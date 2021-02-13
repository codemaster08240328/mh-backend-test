const request = require("request")
const config = require("config")


const getInvestmentHandler = (req, res) => {
  const {id} = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
}

module.exports = {
  getInvestmentHandler,
}
