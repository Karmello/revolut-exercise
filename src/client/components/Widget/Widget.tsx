import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'

import {
  Grid,
  Segment,
  Button,
  Divider,
  InputOnChangeData,
  Loader,
  Icon,
} from 'semantic-ui-react'

import {
  getAccountsRequest,
  convertCurrencyRequest,
  postAmountRequest,
} from 'requests/index'

import {
  AccountData,
  Currency,
  Direction,
  CurrencySection,
  RatesData,
} from 'types'

import { getTargetAmountDiff } from 'helpers/index'
import dict from 'dictionary'
import ViewSwitch from './ViewSwitch/ViewSwitch'

let timeoutId: NodeJS.Timeout

const Widget = () => {
  const [accountsData, setAccountsData] = useState<AccountData[]>(null)
  const [ratesData, setRatesData] = useState<RatesData>(null)
  const [baseCurrency, setBaseCurrency] = useState<Currency>(null)
  const [targetCurrency, setTargetCurrency] = useState<Currency>(null)
  const [amountToExchange, setAmountToExchange] = useState<string>('0')
  const [makingExchangeRequest, setMakingExchangeRequest] = useState<boolean>(
    false
  )

  useEffect(() => {
    ;(async () => {
      const res = await getAccountsRequest()
      setAccountsData(res.data)
      setBaseCurrency(res.data[0].currency)
      setTargetCurrency(res.data[1].currency)
    })()
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (accountsData && !ratesData) {
      if (timeoutId) clearTimeout(timeoutId)
      ;(async () => {
        const res = await convertCurrencyRequest()
        setRatesData({
          [res[0].data.base]: res[0].data.rates,
          [res[1].data.base]: res[1].data.rates,
          [res[2].data.base]: res[2].data.rates,
        })
        timeoutId = setTimeout(() => setRatesData(null), 10000)
      })()
    }
  }, [accountsData, ratesData])

  const onNavigate = (section: CurrencySection, direction: Direction) => {
    setAmountToExchange('0')
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

  const onFormInputChange = (e: React.ChangeEvent, data: InputOnChangeData) => {
    if (isNaN(Number(data.value))) {
      setAmountToExchange('0')
    } else if (data.value.includes('.')) {
      const parts = data.value.split('.')
      if (parts[1].length > 2) {
        parts[1] = parts[1].substr(0, 2)
        setAmountToExchange(parts.join('.'))
      } else {
        setAmountToExchange(data.value)
      }
    } else {
      setAmountToExchange(data.value)
    }
  }

  const onExchangeClick = async () => {
    clearTimeout(timeoutId)
    setMakingExchangeRequest(true)
    const res = await postAmountRequest({
      [baseCurrency]: -Number(amountToExchange),
      [targetCurrency]: getTargetAmountDiff(
        amountToExchange,
        ratesData,
        baseCurrency,
        targetCurrency
      ),
    })
    setAccountsData(res.data)
    setAmountToExchange('0')
    setMakingExchangeRequest(false)
    setRatesData(null)
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
                formValue={amountToExchange.toString()}
                onFormInputChange={onFormInputChange}
                makingExchangeRequest={makingExchangeRequest}
              />
              <Divider section />
              <div style={{ textAlign: 'center' }}>
                <Icon name="arrow down" />
              </div>
              <Divider section />
              <ViewSwitch
                type={CurrencySection.Target}
                accountsData={accountsData}
                ratesData={ratesData}
                onNavigate={onNavigate}
                currency1={targetCurrency}
                currency2={baseCurrency}
                formValue={
                  ratesData
                    ? getTargetAmountDiff(
                        amountToExchange,
                        ratesData,
                        baseCurrency,
                        targetCurrency
                      ).toString()
                    : '0'
                }
                makingExchangeRequest={makingExchangeRequest}
              />
            </>
          ) : (
            <Segment basic padded loading={!accountsData} />
          )}
        </Segment>
        <Segment attached="bottom" secondary>
          <Grid columns={2}>
            <Grid.Column verticalAlign="middle">
              <Loader inline active={makingExchangeRequest} size="small" />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                content={dict.exchange}
                color="blue"
                disabled={
                  makingExchangeRequest ||
                  !accountsData ||
                  !baseCurrency ||
                  !amountToExchange ||
                  !ratesData ||
                  Number(amountToExchange) === 0 ||
                  Number(amountToExchange) >
                    accountsData.find(item => item.currency === baseCurrency)
                      .amount
                }
                onClick={onExchangeClick}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default hot(module)(Widget)
