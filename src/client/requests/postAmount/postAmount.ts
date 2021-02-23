import keys from 'lodash/keys'
import accountsMocks from 'mocks/accounts'
import { AccountData } from 'types'

export default (data: {
  [key: string]: number
}): Promise<{ data: AccountData[] }> => {
  const currencies = keys(data)
  return new Promise(resolve =>
    setTimeout(() => {
      // mocking data update
      ;(accountsMocks.find(item => item.currency === currencies[0]).amount +=
        data[currencies[0]]),
        (accountsMocks.find(item => item.currency === currencies[1]).amount +=
          data[currencies[1]]),
        // mocking response
        resolve({
          data: accountsMocks,
        })
    }, 500)
  )
}
