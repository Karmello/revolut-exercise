import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button, Divider } from 'semantic-ui-react'

import { AccountData, Currency, Direction, CurrencySection } from 'types'
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

  const onNavigate = (section: CurrencySection, direction: Direction) => {
    const currentIndex = accountsData.findIndex(
      item =>
        item.currency ===
        (section === CurrencySection.Base ? baseCurrency : targetCurrency)
    )
    let newCurrency

    if (direction === Direction.Prev) {
      newCurrency =
        accountsData[
          currentIndex > 0 ? currentIndex - 1 : accountsData.length - 1
        ].currency
    } else if (direction === Direction.Next) {
      newCurrency =
        accountsData[
          currentIndex < accountsData.length - 1 ? currentIndex + 1 : 0
        ].currency
    }

    if (section === CurrencySection.Base) {
      setBaseCurrency(newCurrency)
      if (targetCurrency === newCurrency)
        setTargetCurrency(
          accountsData.find(item => item.currency !== targetCurrency).currency
        )
    } else if (section === CurrencySection.Target) {
      setTargetCurrency(newCurrency)
      if (baseCurrency === newCurrency) {
        setBaseCurrency(
          accountsData.find(item => item.currency !== baseCurrency).currency
        )
      }
    }
  }

  return (
    <Grid centered>
      <Grid.Column>
        <Segment attached="top" padded>
          {accountsData && baseCurrency && targetCurrency ? (
            <>
              <ViewSwitch
                type={CurrencySection.Base}
                accountsData={accountsData}
                activeCurrency={baseCurrency}
                exchangedCurrency={targetCurrency}
                onNavigate={onNavigate}
              />
              <Divider section />
              <ViewSwitch
                type={CurrencySection.Target}
                accountsData={accountsData}
                activeCurrency={targetCurrency}
                exchangedCurrency={baseCurrency}
                onNavigate={onNavigate}
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
