import React from 'react'
import { hot } from 'react-hot-loader'
import { Icon, Button, Grid, InputOnChangeData } from 'semantic-ui-react'

import {
  AccountData,
  Currency,
  Direction,
  CurrencySection,
  RatesData,
} from 'types'

import { getExchangeInfo } from 'helpers/index'
import AccountView from './../AccountView/AccountView'

type Props = {
  type: CurrencySection
  accountsData: AccountData[]
  ratesData: RatesData
  onNavigate: (section: CurrencySection, direction: Direction) => void
  currency1: Currency
  currency2: Currency
  formValue: string
  onFormInputChange?: (e: React.ChangeEvent, data: InputOnChangeData) => void
  makingExchangeRequest: boolean
}

const ViewSwitch = ({
  type,
  accountsData,
  ratesData,
  onNavigate,
  currency1,
  currency2,
  formValue,
  onFormInputChange,
  makingExchangeRequest,
}: Props) => (
  <Grid columns={3}>
    <Grid.Column verticalAlign="middle" width={3} textAlign="center">
      <Button
        icon
        basic
        onClick={() => onNavigate(type, Direction.Prev)}
        disabled={makingExchangeRequest}
      >
        <Icon name="arrow left" />
      </Button>
    </Grid.Column>
    <Grid.Column verticalAlign="middle" width={10}>
      <AccountView
        {...accountsData.find(item => item.currency === currency1)}
        formValue={formValue}
        exchangeInfo={
          ratesData && getExchangeInfo(ratesData, currency1, currency2)
        }
        type={type}
        onFormInputChange={onFormInputChange}
        makingExchangeRequest={makingExchangeRequest}
      />
    </Grid.Column>
    <Grid.Column verticalAlign="middle" width={3} textAlign="center">
      <Button
        icon
        basic
        onClick={() => onNavigate(type, Direction.Next)}
        disabled={makingExchangeRequest}
      >
        <Icon name="arrow right" />
      </Button>
    </Grid.Column>
  </Grid>
)

export default hot(module)(ViewSwitch)
