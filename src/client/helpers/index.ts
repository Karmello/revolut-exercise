import Currency from 'types/Currency'
import RatesData from 'types/RatesData'

export const getConvertCurrencyUrl = (base: string, symbols: string) =>
  `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`

export const formatCurrency = (currency: Currency, amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)

export const getExchangeInfo = (
  ratesData: RatesData,
  currency1: Currency,
  currency2: Currency
) =>
  `${formatCurrency(currency1, 1)} = ${formatCurrency(
    currency2,
    ratesData[currency1][currency2]
  )}`
