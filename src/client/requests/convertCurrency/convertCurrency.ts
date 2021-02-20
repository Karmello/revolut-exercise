import axios from 'axios'

import { getConvertCurrencyUrl } from 'helpers/index'

export default (base: string) => {
  const url = getConvertCurrencyUrl(base)
  return axios.get(url)
}
