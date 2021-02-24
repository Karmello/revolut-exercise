import React from 'react'
import { shallow } from 'enzyme'

import Widget from './Widget'

describe('Widget component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Widget />)
    expect(wrapper).toMatchSnapshot()
  })
})
