const Investments = require("../services/Investments")
const Companies = require("../services/Companies")

const {
  csvService,
  prepareCsvData,
  prepareCSVDataForAll,
} = require("../util/helper")

const investments = new Investments()
const companies = new Companies()

const getInvestmentHandler = async (req, res) => {
  const {id} = req.params
  try {
    const data = await investments.fetchInvestmentById(id)
    res.send(data)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

const exportInvestmentByIdHandler = async (req, res) => {
  const {
    investmentId,
  } = req.params

  try {
    const investmentsData = await investments.fetchInvestmentById(investmentId)
    const promises = []

    investmentsData.map(investment => {
      investment.holdings.map(holding => {
        const promise = companies.fetchCompanyById(holding.id)
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

    const csvData = prepareCsvData(investmentsData)
    csvService(csvData, async (csv) => {
      await investments.exportInvestment(csv)
      res.sendStatus(204)
    })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

const exportAllInvestmentsHandler = async (req, res) => {
  try {
    await companies.fetchCompanies()
    await investments.fetchInvestments()

    const csvData = prepareCSVDataForAll(investments.invesments, companies.names)

    csvService(csvData, async (csv) => {
      await investments.exportInvestment(csv)
      res.sendStatus(204)
    })
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}

module.exports = {
  getInvestmentHandler,
  exportInvestmentByIdHandler,
  exportAllInvestmentsHandler,
}
