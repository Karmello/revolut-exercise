import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Grid, Segment, Button, Loader } from 'semantic-ui-react'

import AccountData from 'types/AccountData'
import ViewSwitch from './ViewSwitch/ViewSwitch'
import dict from 'dictionary'

type Props = {
  getInitialData: () => Promise<{ data: AccountData[] }>
}

const Widget = ({ getInitialData }: Props) => {
  const [accountsData, setAccountsData] = useState<AccountData[]>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      const res = await getInitialData()
      setAccountsData(res.data)
      setIsFetching(false)
    })()
  }, [])

  return (
    <Grid centered>
      <Grid.Column>
        <Segment attached={isFetching ? false : 'top'} secondary>
          <Grid columns={2}>
            <Grid.Column>
              <Loader active={isFetching} inline />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                content={dict.exchange}
                color="blue"
                disabled={isFetching}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {!isFetching && (
          <>
            <Segment attached padded>
              <ViewSwitch accountsData={accountsData} />
            </Segment>
            <Segment attached="bottom" padded>
              <ViewSwitch accountsData={accountsData} />
            </Segment>
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default hot(module)(Widget)
