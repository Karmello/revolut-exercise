import React from 'react'
import { hot } from 'react-hot-loader'
import { Header } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import dict from 'dictionary'

type Props = {
  data: AccountData
}

const AccountView = ({ data }: Props) => (
  <>
    <Header as="h1" content={data.currency} />
    <Header as="h4" content={dict.currentAmountText(data.amount)} />
  </>
)

export default hot(module)(AccountView)
