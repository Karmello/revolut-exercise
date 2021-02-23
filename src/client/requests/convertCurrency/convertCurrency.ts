import axios from 'axios'

import { Currency } from 'types'
import { getConvertCurrencyUrl } from 'helpers/index'

export default async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return Promise.all([
    axios.get(
      getConvertCurrencyUrl(Currency.EUR, `${Currency.GBP},${Currency.USD}`)
    ),
    axios.get(
      getConvertCurrencyUrl(Currency.GBP, `${Currency.EUR},${Currency.USD}`)
    ),
    axios.get(
      getConvertCurrencyUrl(Currency.USD, `${Currency.GBP},${Currency.EUR}`)
    ),
  ])
}
