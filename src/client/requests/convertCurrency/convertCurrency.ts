import axios from 'axios'

import { getConvertCurrencyUrl } from 'helpers/index'

export default async (base: string, symbols: string) => {
  const url = getConvertCurrencyUrl(base, symbols)
  await new Promise(resolve => setTimeout(resolve, 500))
  return axios.get(url)
}
