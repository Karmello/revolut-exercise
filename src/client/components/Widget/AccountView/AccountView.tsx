import React from 'react'
import { hot } from 'react-hot-loader'
import { Header } from 'semantic-ui-react'

import Currency from 'types/Currency'

type Props = {
  currency: Currency
}

const AccountView = ({ currency }: Props) => (
  <>
    <Header as="h1" content={currency} />
  </>
)

export default hot(module)(AccountView)
