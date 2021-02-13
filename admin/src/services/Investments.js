const axios = require("axios")
const config = require("config")

const {
  investmentsServiceUrl,
} = config

class Investments {
  constructor() {
    this.investments = []
  }

  get invesments() {
    return this.investments
  }

  async fetchInvestments() {
    const {data} = await axios.get(`${investmentsServiceUrl}/investments`)
    this.investments = [...data]
  }

  async fetchInvestmentById(id) {
    const {data} = await axios.get(`${investmentsServiceUrl}/investments/${id}`)
    return data
  }

  async exportInvestment(csv) {
    await axios.post(`${investmentsServiceUrl}/investments/export`, {csv})
  }
}

module.exports = Investments
