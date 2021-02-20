import Currency from 'types/Currency'
import RatesData from 'types/RatesData'

export const getConvertCurrencyUrl = (base: string) =>
  `https://api.exchangeratesapi.io/latest?base=${base}`

export const formatCurrency = (currency: Currency, amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)

export const getComparedRatesString = (
  ratesData: RatesData,
  currency1: Currency,
  currency2: Currency
) =>
  `${formatCurrency(currency1, 1)} = ${formatCurrency(
    currency2,
    ratesData.rates[currency2] || 1
  )}`
