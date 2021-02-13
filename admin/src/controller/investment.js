const axios = require("axios")
const config = require("config")
const {
  csvService,
  prepareCsvData,
} = require("../util/helper")

const {
  investmentsServiceUrl,
  companyServiceUrl,
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

const exportInvestmentHandler = async (req, res) => {
  const {
    investmentId,
  } = req.params

  try {
    const {data: investments} = await axios.get(`${investmentsServiceUrl}/investments/${investmentId}`)
    const promises = []

    investments.map(investment => {
      investment.holdings.map(holding => {
        const promise = axios.get(`${companyServiceUrl}/companies/${holding.id}`)
          .then(res => {
            holding.name = res.data.name
          })
          .catch (e => {
            throw e
          })

        promises.push(promise)
      })
    })

    await Promise.all(promises)

    const csvData = prepareCsvData(investments)
    csvService(csvData, async (csv) => {
      await axios.post(`${investmentsServiceUrl}/investments/export`, {csv})
      res.sendStatus(204)
    })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

module.exports = {
  getInvestmentHandler,
  exportInvestmentHandler,
}
