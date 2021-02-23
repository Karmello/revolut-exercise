import React from 'react'
import { hot } from 'react-hot-loader'
import { Header, Grid, Loader } from 'semantic-ui-react'

import { Currency } from 'types'
import { formatCurrency } from 'helpers/index'
import dict from 'dictionary'

type Props = {
  currency: Currency
  amount: number
  exchangeInfo: string
}

const AccountView = ({ currency, amount, exchangeInfo }: Props) => (
  <>
    <Header as="h1" content={currency} />
    <Grid columns={2}>
      <Grid.Column>
        <Header
          as="h4"
          content={dict.currentAmountText(formatCurrency(currency, amount))}
          color="blue"
        />
      </Grid.Column>
      <Grid.Column textAlign="right">
        {exchangeInfo ? (
          <Header as="h4" content={exchangeInfo} color="blue" />
        ) : (
          <Loader active={!exchangeInfo} size="tiny" />
        )}
      </Grid.Column>
    </Grid>
  </>
)

export default hot(module)(AccountView)
