import axios from 'axios'

import { getConvertCurrencyUrl } from 'helpers/index'

export default (base: string, symbols: string) => {
  const url = getConvertCurrencyUrl(base, symbols)
  return axios.get(url)
}
