import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button, Divider } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import Currency from 'types/Currency'
import { getAccountsRequest } from 'requests/index'
import ViewSwitch from './ViewSwitch/ViewSwitch'
import dict from 'dictionary'

const Widget = () => {
  const [accountsData, setAccountsData] = useState<AccountData[]>(null)
  const [baseCurrency, setBaseCurrency] = useState<Currency>(null)
  const [targetCurrency, setTargetCurrency] = useState<Currency>(null)

  useEffect(() => {
    ;(async () => {
      const res = await getAccountsRequest()
      setAccountsData(res.data)
      setBaseCurrency(res.data[0].currency)
      setTargetCurrency(res.data[1].currency)
    })()
  }, [])

  return (
    <Grid centered>
      <Grid.Column>
        <Segment attached="top" padded>
          {accountsData && baseCurrency && targetCurrency ? (
            <>
              <ViewSwitch
                accountsData={accountsData}
                activeCurrency={baseCurrency}
                setActiveCurrency={setBaseCurrency}
                exchangedCurrency={targetCurrency}
              />
              <Divider section />
              <ViewSwitch
                accountsData={accountsData}
                activeCurrency={targetCurrency}
                setActiveCurrency={setTargetCurrency}
                exchangedCurrency={baseCurrency}
              />
            </>
          ) : (
            <Segment basic padded loading={!accountsData} />
          )}
        </Segment>
        <Segment attached="bottom" secondary>
          <Grid columns={1}>
            <Grid.Column textAlign="right">
              <Button
                content={dict.exchange}
                color="blue"
                disabled={!accountsData}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default hot(module)(Widget)
