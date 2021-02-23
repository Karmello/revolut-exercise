import { getConvertCurrencyUrl } from './index'

describe('helper methods', () => {
  describe('getConvertCurrencyUrl', () => {
    it('should return correct url', () => {
      const url = getConvertCurrencyUrl('USD', 'EUR')
      expect(url).toEqual(
        'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR'
      )
    })
  })
})
