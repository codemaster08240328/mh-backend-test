const converter = require("json-2-csv")

const csvService = (data, cb) => {
  converter.json2csv(data, (e, csv) => {
    if (e) {
      throw e
    }

    cb(csv)
  })
}

const prepareCsvData = (investments) => {
  const csvData = []
  investments.map((investment) => {
    const {
      holdings,
      userId,
      firstName,
      lastName,
      investmentTotal,
      date,
    } = investment

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
  })

  return csvData
}

const prepareCSVDataForAll = (investments, companyNames) => {
  const csvData = []
  investments.map((investment) => {
    const {
      holdings,
      userId,
      firstName,
      lastName,
      investmentTotal,
      date,
    } = investment

    holdings.map(holding => {
      csvData.push({
        User: userId,
        "First Name": firstName,
        "Last Name": lastName,
        Date: date,
        Holding: companyNames[holding.id],
        Value: holding.investmentPercentage * investmentTotal,
      })
    })
  })

  return csvData
}

module.exports = {
  csvService,
  prepareCsvData,
  prepareCSVDataForAll,
}
