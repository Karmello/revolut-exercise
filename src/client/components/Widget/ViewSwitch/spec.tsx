import React from 'react'
import { shallow } from 'enzyme'

import { CurrencySection, Currency } from 'types'
import ViewSwitch from './ViewSwitch'

describe('ViewSwitch component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ViewSwitch
        type={CurrencySection.Base}
        accountsData={[
          { currency: Currency.EUR, amount: 25.45 },
          { currency: Currency.GBP, amount: 25.45 },
          { currency: Currency.USD, amount: 25.45 },
        ]}
        ratesData={{
          [Currency.EUR]: {
            [Currency.GBP]: 1.25,
          },
        }}
        currency1={Currency.EUR}
        currency2={Currency.GBP}
        onNavigate={() => {}}
        formValue="10"
        makingExchangeRequest={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
