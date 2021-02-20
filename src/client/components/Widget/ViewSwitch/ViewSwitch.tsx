import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { Container, Icon, Divider } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
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
}

const ViewSwitch = ({ accountsData }: Props) => {
  const [activeViewNo, setActiveViewNo] = useState<number>(1)

  const getIconColor = (viewNo: number) =>
    viewNo === activeViewNo ? activeIconColor : inactiveIconColor

  const onSwitchActiveView = (viewNo: number) => () => setActiveViewNo(viewNo)

  if (!accountsData) return null

  return (
    <>
      <AccountView data={accountsData[activeViewNo - 1]} />
      <Divider hidden />
      <Container textAlign="center">
        {accountsData.map((item, index) => (
          <Icon
            color={getIconColor(index + 1)}
            onClick={onSwitchActiveView(index + 1)}
            {...iconBasicProps}
          />
        ))}
      </Container>
    </>
  )
}

export default hot(module)(ViewSwitch)
