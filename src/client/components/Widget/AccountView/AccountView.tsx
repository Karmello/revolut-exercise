import React from 'react'
import { hot } from 'react-hot-loader'
import { Header, Grid } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import { formatCurrency } from 'helpers/index'
import dict from 'dictionary'

type Props = {
  data: AccountData
  comparedRatesString: string
}

const AccountView = ({ data, comparedRatesString }: Props) => (
  <>
    <Header as="h1" content={data.currency} />
    <Grid columns={comparedRatesString !== null ? 2 : 1}>
      <Grid.Column>
        <Header
          as="h4"
          content={dict.currentAmountText(
            formatCurrency(data.currency, data.amount)
          )}
        />
      </Grid.Column>
      {comparedRatesString !== null && (
        <Grid.Column textAlign="right">
          <Header as="h4" content={comparedRatesString} />
        </Grid.Column>
      )}
    </Grid>
  </>
)

export default hot(module)(AccountView)
