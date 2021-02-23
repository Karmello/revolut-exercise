import React from 'react'
import { hot } from 'react-hot-loader'

import {
  Header,
  Grid,
  Loader,
  Form,
  InputOnChangeData,
} from 'semantic-ui-react'

import { Currency, CurrencySection } from 'types'
import { formatCurrency } from 'helpers/index'
import dict from 'dictionary'

type Props = {
  type: CurrencySection
  currency: Currency
  amount: number
  exchangeInfo: string
  formValue: string
  onFormInputChange?: (e: React.ChangeEvent, data: InputOnChangeData) => void
  makingExchangeRequest: boolean
}

const AccountView = ({
  type,
  currency,
  amount,
  formValue,
  exchangeInfo,
  onFormInputChange,
  makingExchangeRequest,
}: Props) => (
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
    <Grid column={1}>
      <Grid.Column textAlign="center">
        {type === CurrencySection.Base && (
          <Form.Input
            label={<span style={{ fontSize: '20px' }}>- </span>}
            value={formValue}
            size="big"
            style={{ width: '100px' }}
            onChange={onFormInputChange}
            disabled={makingExchangeRequest}
          />
        )}
        {type === CurrencySection.Target && (
          <Form.Input
            label={<span style={{ fontSize: '20px' }}>+ </span>}
            value={formValue || 0}
            size="big"
            style={{ width: '100px' }}
            disabled
          />
        )}
      </Grid.Column>
    </Grid>
  </>
)

export default hot(module)(AccountView)
