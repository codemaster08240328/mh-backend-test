const axios = require("axios")
const config = require("config")
const converter = require("json-2-csv")

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
    const {data: investment} = await axios.get(`${investmentsServiceUrl}/investments/${investmentId}`)

    const {
      holdings,
      userId,
      firstName,
      lastName,
      investmentTotal,
      date,
    } = investment[0]

    for (const holding of holdings) {
      const {data: company} = await axios.get(`${companyServiceUrl}/companies/${holding.id}`)
      holding.name = company.name
    }

    const csvData = []


    holdings.map(holding => {
      csvData.push({
        User: userId,
        "First Name": firstName,
        "Last Name": lastName,
        Date: date,
        Holding: holding.name,
        Value: holding.investmentPercentage * investmentTotal,
      })
    })

    converter.json2csv(csvData, (e, csv) => {
      if (e) {
        throw e
      }

      res.send(csv)
    })
  } catch (e) {
    console.error(e)
    res.sendStatus(e)
  }

}

module.exports = {
  getInvestmentHandler,
  exportInvestmentHandler,
}
