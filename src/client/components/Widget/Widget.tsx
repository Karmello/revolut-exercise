import React from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button } from 'semantic-ui-react'

import ViewSwitch from './ViewSwitch/ViewSwitch'
import dict from 'dictionary'

const Widget = () => (
  <Grid centered>
    <Grid.Column>
      <Segment attached="top" textAlign="right">
        <Button content={dict.exchange} color="blue" />
      </Segment>
      <Segment attached>
        <ViewSwitch />
      </Segment>
      <Segment attached="bottom">
        <ViewSwitch />
      </Segment>
    </Grid.Column>
  </Grid>
)

export default hot(module)(Widget)
