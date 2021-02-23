import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Icon, Button, Grid } from 'semantic-ui-react'

import { AccountData, Currency, Direction, CurrencySection } from 'types'
import { convertCurrencyRequest } from 'requests/index'
import { getComparedRatesString } from 'helpers/index'
import AccountView from './../AccountView/AccountView'

type Props = {
  type: CurrencySection
  accountsData: AccountData[]
  activeCurrency: Currency
  exchangedCurrency: Currency
  onNavigate: (section: CurrencySection, direction: Direction) => void
}

const ViewSwitch = ({
  type,
  accountsData,
  activeCurrency,
  exchangedCurrency,
  onNavigate,
}: Props) => {
  const [comparedRatesString, setComparedRatesString] = useState<string>('')

  // useEffect(() => {
  //   ;(async () => {
  //     const res = await convertCurrencyRequest(
  //       activeCurrency,
  //       exchangedCurrency
  //     )
  //     setComparedRatesString(
  //       getComparedRatesString(res.data, activeCurrency, exchangedCurrency)
  //     )
  //   })()
  // }, [activeCurrency, exchangedCurrency])

  return (
    <Grid columns={3}>
      <Grid.Column verticalAlign="middle" width={3} textAlign="center">
        <Button icon basic onClick={() => onNavigate(type, Direction.Prev)}>
          <Icon name="arrow left" />
        </Button>
      </Grid.Column>
      <Grid.Column verticalAlign="middle" width={10}>
        <AccountView
          data={accountsData.find(item => item.currency === activeCurrency)}
          comparedRatesString={comparedRatesString}
        />
      </Grid.Column>
      <Grid.Column verticalAlign="middle" width={3} textAlign="center">
        <Button icon basic onClick={() => onNavigate(type, Direction.Next)}>
          <Icon name="arrow right" />
        </Button>
      </Grid.Column>
    </Grid>
  )
}

export default hot(module)(ViewSwitch)
