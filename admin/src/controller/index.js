const axios = require("axios")
const config = require("config")

const {
  investmentsServiceUrl,
} = config

const getInvestmentHandler = (req, res) => {
  const {id} = req.params
  axios.get(`${investmentsServiceUrl}/investments/${id}`)
    .then(resp => {
      res.send(resp.data)
    })
    .catch((e) => {
      console.error(e)
      res.sendStatus(500)
    })
}

const exportInvestmentHandler = (req, res) => {
  const {
    investmentId,
  } = req.params

  res.send(investmentId)
  // request.get(`${investmentsServiceUrl}/investments/${investmentId}`, (e, r, investments) => {
  //   if (e) {
  //     console.error(e)
  //     res.send(500)
  //   } else {
  //     res.send(investments)
  //   }
  // })
}

module.exports = {
  getInvestmentHandler,
  exportInvestmentHandler,
}
