import React from 'react'
import { hot } from 'react-hot-loader'
import { Container, Divider } from 'semantic-ui-react'

import { Widget } from 'components/index'

const App = () => (
  <Container>
    <Divider hidden section />
    <div style={{ margin: '0 auto', maxWidth: '500px' }}>
      <Widget />
    </div>
  </Container>
)

export default hot(module)(App)
