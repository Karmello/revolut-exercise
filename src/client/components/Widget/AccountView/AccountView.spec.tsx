import React from 'react'
import { shallow } from 'enzyme'

import { CurrencySection, Currency } from 'types'
import AccountView from './AccountView'

describe('AccountView component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <AccountView
        type={CurrencySection.Base}
        currency={Currency.EUR}
        amount={100}
        exchangeInfo="€1.00 = $1.23"
        formValue="23.45"
        makingExchangeRequest={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const wrapper = shallow(
      <AccountView
        type={CurrencySection.Target}
        currency={Currency.GBP}
        amount={45}
        exchangeInfo="€1.00 = $1.23"
        formValue="14.10"
        makingExchangeRequest={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
