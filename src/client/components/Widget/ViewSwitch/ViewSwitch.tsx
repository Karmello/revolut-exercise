import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { Container, Icon } from 'semantic-ui-react'
import values from 'lodash/values'

import AccountView from './../AccountView/AccountView'

import Currency from 'types/Currency'

const activeIconColor = 'blue'
const inactiveIconColor = 'yellow'

const iconBasicProps = {
  name: 'dot circle',
  size: 'large',
  style: { cursor: 'pointer' },
} as any

const ViewSwitch = () => {
  const [activeViewNo, setActiveViewNo] = useState<number>(1)

  const getIconColor = (viewNo: number) =>
    viewNo === activeViewNo ? activeIconColor : inactiveIconColor

  const onSwitchActiveView = (viewNo: number) => () => setActiveViewNo(viewNo)

  return (
    <>
      <AccountView currency={values(Currency)[activeViewNo - 1]} />
      <Container textAlign="center">
        <Icon
          color={getIconColor(1)}
          onClick={onSwitchActiveView(1)}
          {...iconBasicProps}
        />
        <Icon
          color={getIconColor(2)}
          onClick={onSwitchActiveView(2)}
          {...iconBasicProps}
        />
        <Icon
          color={getIconColor(3)}
          onClick={onSwitchActiveView(3)}
          {...iconBasicProps}
        />
      </Container>
    </>
  )
}

export default hot(module)(ViewSwitch)
