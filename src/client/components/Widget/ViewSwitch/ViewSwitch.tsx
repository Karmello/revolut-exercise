import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Container, Icon, Divider } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import Currency from 'types/Currency'
import RatesData from 'types/RatesData'
import { convertCurrencyRequest } from 'requests/index'
import { getComparedRatesString } from 'helpers/index'
import AccountView from './../AccountView/AccountView'

const activeIconColor = 'blue'
const inactiveIconColor = 'yellow'

const iconBasicProps = {
  name: 'dot circle',
  size: 'large',
  style: { cursor: 'pointer' },
} as any

type Props = {
  accountsData: AccountData[]
  activeCurrency: Currency
  setActiveCurrency: (currency: Currency) => void
  exchangedCurrency: Currency
}

const ViewSwitch = ({
  accountsData,
  activeCurrency,
  setActiveCurrency,
  exchangedCurrency,
}: Props) => {
  const [comparedRatesString, setComparedRatesString] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const res = await convertCurrencyRequest(
        activeCurrency,
        exchangedCurrency
      )
      setComparedRatesString(
        getComparedRatesString(res.data, activeCurrency, exchangedCurrency)
      )
    })()
  }, [activeCurrency, exchangedCurrency])

  const getIconColor = (currency: Currency) =>
    currency === activeCurrency ? activeIconColor : inactiveIconColor

  const onSwitchActiveView = (currency: Currency) => () => {
    if (currency !== exchangedCurrency) setActiveCurrency(currency)
  }

  if (!comparedRatesString) return null

  return (
    <>
      <AccountView
        data={accountsData.find((item) => item.currency === activeCurrency)}
        comparedRatesString={comparedRatesString}
      />
      <Divider hidden />
      <Container textAlign="center">
        {accountsData.map((item, index) => (
          <Icon
            key={index}
            color={getIconColor(item.currency)}
            onClick={onSwitchActiveView(item.currency)}
            {...iconBasicProps}
          />
        ))}
      </Container>
    </>
  )
}

export default hot(module)(ViewSwitch)
