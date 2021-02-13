const {expect} = require("chai")
const {prepareCsvData, csvService, prepareCSVDataForAll} = require("../src/util/helper")

const MOCK_INVESTMENT_DATA = [
  {
    "id": "6",
    "userId": "2",
    "firstName": "Sheila",
    "lastName": "Aussie",
    "investmentTotal": 21500,
    "date": "2020-03-01",
    "holdings": [
      {
        "id": "1",
        "investmentPercentage": 0.5,
        "name": "The Big Investment Company",
      },
      {
        "id": "2",
        "investmentPercentage": 0.3,
        "name": "The Big Investment Company 2",
      },
      {
        "id": "3",
        "investmentPercentage": 0.2,
        "name": "The Big Investment Company 3",
      },
    ],
  },
]

const MOCK_COMPANY_ID_NAME = {
  1: "The Big Investment Company",
  2: "The Big Investment Company 2",
  3: "The Big Investment Company 3",
}

const EXPECTED_OUTPUT_FOR_CSV = [
  {
    User: "2",
    "First Name": "Sheila",
    "Last Name": "Aussie",
    Date: "2020-03-01",
    Holding: "The Big Investment Company",
    Value: 10750,
  },
  {
    User: "2",
    "First Name": "Sheila",
    "Last Name": "Aussie",
    Date: "2020-03-01",
    Holding: "The Big Investment Company 2",
    Value: 6450,
  },
  {
    User: "2",
    "First Name": "Sheila",
    "Last Name": "Aussie",
    Date: "2020-03-01",
    Holding: "The Big Investment Company 3",
    Value: 4300,
  },
]

const EXPECTED_OUTPUT_AS_CSV = "User,First Name,Last Name,Date,Holding,Value\n2,Sheila,Aussie,2020-03-01,The Big Investment Company,10750\n2,Sheila,Aussie,2020-03-01,The Big Investment Company 2,6450\n2,Sheila,Aussie,2020-03-01,The Big Investment Company 3,4300"

let resultFromPrepareCsvData = ""

describe("helper", () => {
  it("prepareCsvData function works!", () => {
    const result = prepareCsvData(MOCK_INVESTMENT_DATA)
    resultFromPrepareCsvData = result
    expect(result).to.deep.equal(EXPECTED_OUTPUT_FOR_CSV)
  })

  it("prepareCSVDataForAll function works!", () => {
    const result = prepareCSVDataForAll(MOCK_INVESTMENT_DATA, MOCK_COMPANY_ID_NAME)
    expect(result).to.deep.equal(EXPECTED_OUTPUT_FOR_CSV)
  })

  it("csvService function works with correct data format", () => {
    csvService(resultFromPrepareCsvData, (csv) => {
      expect(csv).to.equal(EXPECTED_OUTPUT_AS_CSV)
    })
  })

  it("csvService function throws an error with invalid data format", () => {
    expect(() => {
      csvService(undefined, null)
    }).to.throw("Cannot call json2csv on undefined")
  })
})
