import { Currency } from 'types'

import {
  getConvertCurrencyUrl,
  formatCurrency,
  getExchangeInfo,
  getTargetAmountDiff,
} from './index'

describe('helper methods', () => {
  describe('getConvertCurrencyUrl', () => {
    it('should return correct url', () => {
      const url = getConvertCurrencyUrl(Currency.USD, Currency.EUR)
      expect(url).toEqual(
        'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR'
      )
    })
  })
  describe('formatCurrency', () => {
    it('should format correctly', () => {
      const formatted = formatCurrency(Currency.USD, 100)
      expect(formatted).toEqual('$100.00')
    })
  })
  describe('getExchangeInfo', () => {
    it('should return correct info string', () => {
      const info = getExchangeInfo(
        {
          [Currency.EUR]: {
            [Currency.USD]: 1.23,
          },
        },
        Currency.EUR,
        Currency.USD
      )
      expect(info).toEqual('€1.00 = $1.23')
    })
  })
  describe('getTargetAmountDiff', () => {
    it('should return proper amount', () => {
      const amount = getTargetAmountDiff(
        '23.45',
        {
          [Currency.GBP]: {
            [Currency.EUR]: 0.87,
          },
        },
        Currency.GBP,
        Currency.EUR
      )
      expect(amount).toEqual(20.4)
    })
  })
})
