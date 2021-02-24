import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'semantic-ui-react'

import { Currency } from 'types'
import Widget from './Widget'

describe('Widget component', () => {
  it('should have initial currencies set properly', done => {
    const wrapper = mount(<Widget />)
    setTimeout(() => {
      wrapper.update()
      const labels = wrapper.find('.activeCurrency')
      expect(labels.at(0).text()).toEqual(Currency.USD)
      expect(labels.at(1).text()).toEqual(Currency.EUR)
      done()
    }, 2000)
  })

  it('should have currencies set properly after navigating', done => {
    const wrapper = mount(<Widget />)
    setTimeout(() => {
      wrapper.update()
      wrapper.find('.buttonNext').at(0).find(Button).simulate('click')
      const labels = wrapper.find('.activeCurrency')
      expect(labels.at(0).text()).toEqual(Currency.EUR)
      expect(labels.at(1).text()).toEqual(Currency.USD)
      done()
    }, 2000)
  })
})
