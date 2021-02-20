import AccountData from 'types/AccountData'

export default (): Promise<{ data: AccountData[] }> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        // mocking response
        resolve({
          data: [
            {
              currency: 'USD',
              amount: '25.51',
            },
            {
              currency: 'EUR',
              amount: '116.12',
            },
            {
              currency: 'GPB',
              amount: '58.33',
            },
          ],
        }),
      500
    )
  )
