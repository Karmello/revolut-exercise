import AccountData from 'types/AccountData'
import Currency from 'types/Currency'

export default (): Promise<{ data: AccountData[] }> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        // mocking response
        resolve({
          data: [
            {
              currency: 'USD' as Currency,
              amount: 25.51,
            },
            {
              currency: 'EUR' as Currency,
              amount: 116.12,
            },
            {
              currency: 'GBP' as Currency,
              amount: 58.33,
            },
          ],
        }),
      500
    )
  )
