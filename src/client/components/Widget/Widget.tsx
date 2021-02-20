import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button, Loader } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import Currency from 'types/Currency'
import { getAccountsRequest } from 'requests/index'
import ViewSwitch from './ViewSwitch/ViewSwitch'
import dict from 'dictionary'

const Widget = () => {
  const [accountsData, setAccountsData] = useState<AccountData[]>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [baseCurrency, setBaseCurrency] = useState<Currency>(null)
  const [targetCurrency, setTargetCurrency] = useState<Currency>(null)

  useEffect(() => {
    ;(async () => {
      const res = await getAccountsRequest()
      setAccountsData(res.data)
      setBaseCurrency(res.data[0].currency)
      setTargetCurrency(res.data[1].currency)
      setIsFetching(false)
    })()
  }, [])

  return (
    <Grid centered>
      <Grid.Column>
        <Segment attached={isFetching ? false : 'top'} secondary>
          <Grid columns={2}>
            <Grid.Column>
              <Loader active={isFetching} inline />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                content={dict.exchange}
                color="blue"
                disabled={isFetching}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {accountsData && baseCurrency && targetCurrency && (
          <>
            <Segment attached padded>
              <ViewSwitch
                accountsData={accountsData}
                activeCurrency={baseCurrency}
                setActiveCurrency={setBaseCurrency}
                exchangedCurrency={targetCurrency}
              />
            </Segment>
            <Segment attached="bottom" padded>
              <ViewSwitch
                accountsData={accountsData}
                activeCurrency={targetCurrency}
                setActiveCurrency={setTargetCurrency}
                exchangedCurrency={baseCurrency}
              />
            </Segment>
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default hot(module)(Widget)
