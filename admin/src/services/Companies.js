const axios = require("axios")
const config = require("config")

const {
  companyServiceUrl,
} = config

class Companies {
  constructor() {
    this.companies = []
    this.companyName = {}
  }

  get names() {
    return this.companyName
  }

  async fetchCompanies() {
    const {data} = await axios.get(`${companyServiceUrl}/companies`)
    this.companies = [...data]

    data.map(company => {
      this.companyName[company.id] = company.name
    })
  }

  fetchCompanyById(id) {
    return axios.get(`${companyServiceUrl}/companies/${id}`)
  }
}

module.exports = Companies
