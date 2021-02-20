import Currency from './Currency'

type RatesData = {
  base: Currency
  rates: {
    [key: string]: number
  }
}

export default RatesData
