import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button, Divider } from 'semantic-ui-react'

import {
  AccountData,
  Currency,
  Direction,
  CurrencySection,
  RatesData,
} from 'types'

import { getAccountsRequest, convertCurrencyRequest } from 'requests/index'
import ViewSwitch from './ViewSwitch/ViewSwitch'
import dict from 'dictionary'

const Widget = () => {
  const [accountsData, setAccountsData] = useState<AccountData[]>(null)
  const [ratesData, setRatesData] = useState<any>(null)
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

  useEffect(() => {
    if (accountsData) {
      ;(async () => {
        const res = await convertCurrencyRequest()
        setRatesData({
          [res[0].data.base]: res[0].data.rates,
          [res[1].data.base]: res[1].data.rates,
          [res[2].data.base]: res[2].data.rates,
        })
      })()
    }
  }, [accountsData])

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
                ratesData={ratesData}
                onNavigate={onNavigate}
                currency1={baseCurrency}
                currency2={targetCurrency}
              />
              <Divider section />
              <ViewSwitch
                type={CurrencySection.Target}
                accountsData={accountsData}
                ratesData={ratesData}
                onNavigate={onNavigate}
                currency1={targetCurrency}
                currency2={baseCurrency}
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
